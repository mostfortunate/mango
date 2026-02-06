import {
  buildAxiosConfig,
  buildHistoryItem,
  formatErrorMessage,
  isSuccessStatus,
  parseJsonBody,
  validateKeyValueInputs,
  validateUrl,
} from "@/hooks/use-http-request/helpers";

import {
  getStatusText,
  hasEmptyKeys,
  keyValueArrayToObject,
} from "@/lib/utils";

import { type AxiosResponse } from "axios";

jest.mock("@/lib/utils", () => ({
  keyValueArrayToObject: jest.fn(),
  stringifyResponseBody: jest.fn(),
  getStatusText: jest.fn(),
  hasEmptyKeys: jest.fn(),
}));

describe("useHttpRequest pure helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("validateUrl", () => {
    it("returns error when url is empty", () => {
      const result = validateUrl("");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe("Please enter a URL.");
      }
    });

    it("returns error for invalid url", () => {
      const result = validateUrl("not-a-url");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe("Please enter a valid URL.");
      }
    });

    it("returns error for unsupported protocol", () => {
      const result = validateUrl("ftp://example.com");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(
          "Only HTTP and HTTPS protocols are supported.",
        );
      }
    });

    it("returns parsed URL for valid http/https", () => {
      const result = validateUrl("https://example.com/path");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBeInstanceOf(URL);
        expect(result.value?.protocol).toBe("https:");
      }
    });
  });

  describe("validateKeyValueInputs", () => {
    const headers = [{ key: "", value: "a" }];
    const queryParams = [{ key: "", value: "b" }];

    const cases = [
      {
        name: "both headers and query params empty",
        headersEmpty: true,
        queryEmpty: true,
        expectedError:
          "Query parameters and headers must have non-empty keys.",
      },
      {
        name: "only headers empty",
        headersEmpty: true,
        queryEmpty: false,
        expectedError: "Headers must have non-empty keys.",
      },
      {
        name: "only query params empty",
        headersEmpty: false,
        queryEmpty: true,
        expectedError: "Query parameters must have non-empty keys.",
      },
      {
        name: "neither empty",
        headersEmpty: false,
        queryEmpty: false,
        expectedError: null,
      },
    ];

    it.each(cases)("handles $name", ({
      headersEmpty,
      queryEmpty,
      expectedError,
    }) => {
      // mock by argument to avoid relying on call order
      (hasEmptyKeys as jest.Mock).mockImplementation(
        (input: { key: string; value: string }[]) => {
          if (input === headers) {
            return headersEmpty;
          }
          if (input === queryParams) {
            return queryEmpty;
          }
          return false;
        },
      );

      const result = validateKeyValueInputs(headers, queryParams);

      // All four combinations are covered explicitly.
      if (expectedError) {
        expect(result.ok).toBe(false);
        if (!result.ok) {
          expect(result.error).toBe(expectedError);
        }
      } else {
        expect(result.ok).toBe(true);
      }
    });
  });

  describe("parseJsonBody", () => {
    it("returns undefined for empty request body", () => {
      const result = parseJsonBody("");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBeUndefined();
      }
    });

    it("returns parsed object for valid JSON", () => {
      const result = parseJsonBody('{"a":1}');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual({ a: 1 });
      }
    });

    it("returns error for invalid JSON", () => {
      const result = parseJsonBody("{bad json");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe("Request body must contain valid JSON.");
      }
    });
  });

  describe("buildAxiosConfig", () => {
    it("builds axios config with normalized method and mapped params/headers", () => {
      (keyValueArrayToObject as jest.Mock)
        .mockImplementationOnce(() => ({ p: "1" }))
        .mockImplementationOnce(() => ({ h: "2" }));

      const config = buildAxiosConfig({
        url: "https://example.com",
        method: "GET",
        queryParams: [{ key: "p", value: "1" }],
        headers: [{ key: "h", value: "2" }],
        data: { ok: true },
      });

      expect(keyValueArrayToObject).toHaveBeenCalledTimes(2);
      expect(config).toMatchObject({
        url: "https://example.com",
        method: "get",
        params: { p: "1" },
        headers: { h: "2" },
        data: { ok: true },
      });
      expect(config.validateStatus()).toBe(true);
    });
  });

  describe("isSuccessStatus", () => {
    it("returns true for 2xx", () => {
      expect(isSuccessStatus(200)).toBe(true);
      expect(isSuccessStatus(299)).toBe(true);
    });

    it("returns false for non-2xx", () => {
      expect(isSuccessStatus(199)).toBe(false);
      expect(isSuccessStatus(300)).toBe(false);
    });
  });

  describe("buildHistoryItem", () => {
    it("builds history item with status text and time", () => {
      (getStatusText as jest.Mock).mockReturnValue("OK");

      const response = {
        status: 201,
        customData: { time: 123 },
      } as unknown as AxiosResponse;

      const item = buildHistoryItem({
        method: "POST",
        url: "https://example.com",
        response,
      });

      expect(item).toEqual({
        method: "POST",
        url: "https://example.com",
        status: 201,
        statusText: "OK",
        time: 123,
      });
    });

    it("defaults time to 0 when missing", () => {
      (getStatusText as jest.Mock).mockReturnValue("OK");

      const response = { status: 200 } as unknown as AxiosResponse;

      const item = buildHistoryItem({
        method: "GET",
        url: "https://example.com",
        response,
      });

      expect(item.time).toBe(0);
    });
  });

  describe("formatErrorMessage", () => {
    it("formats axios error with response", () => {
      (getStatusText as jest.Mock).mockReturnValue("Not Found");

      const message = formatErrorMessage({
        response: { status: 404 },
      });

      expect(message).toBe("HTTP Error: 404 Not Found");
    });

    it("formats error with message", () => {
      const message = formatErrorMessage(new Error("Boom"));
      expect(message).toBe("Error: Boom");
    });

    it("falls back to generic message", () => {
      const message = formatErrorMessage(123);
      expect(message).toBe("Network or unknown error occurred.");
    });
  });
});
