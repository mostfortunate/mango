import { InputGroupButton } from "@/components/ui/input-group";
import { History, Send } from "lucide-react";

// the reason I've commented out certain stuff here is b/c I personally want address bar to always be overwritten by the selected endpoint
export interface ActionsProps {
  isHistoryOpen: boolean;
  onToggleHistory: (isOpen: boolean) => void;
  onSend: () => void;
  // autofillExistingUrl: boolean;
  // onAutofillExistingUrlChange: (next: boolean) => void;
}

export const Actions = ({
  isHistoryOpen,
  onToggleHistory,
  onSend,
  // autofillExistingUrl,
  // onAutofillExistingUrlChange,
}: ActionsProps) => {
  return (
    <>
      {/* <InputGroupButton
        variant={autofillExistingUrl ? "secondary" : "ghost"}
        onClick={() => onAutofillExistingUrlChange(!autofillExistingUrl)}
        aria-pressed={autofillExistingUrl}
        aria-label="Autofill even when URL is set"
        title="Autofill even when URL is set"
      >
        <Zap />
        <span className="sr-only">Autofill even when URL is set</span>
      </InputGroupButton> */}
      <InputGroupButton
        className="bg-transparent"
        variant="secondary"
        onClick={() => onToggleHistory(!isHistoryOpen)}
        aria-haspopup="menu"
        aria-expanded={isHistoryOpen}
        aria-controls="request-history-menu"
      >
        <History />
        <span className="sr-only">Request History</span>
      </InputGroupButton>
      <InputGroupButton variant="outline" onClick={onSend}>
        <Send fill="#5e17eb" className="text-primary" />
      </InputGroupButton>
    </>
  );
};
