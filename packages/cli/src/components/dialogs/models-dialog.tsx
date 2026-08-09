import { useCallback } from "react";
import { useDialog } from "../../providers/dialog";
import { DialogSearchList } from "../dialog-search-list";
import { Mode } from "@nightcli/database/enums";
import type { SupportedChatModelId } from "@nightcli/shared";

type ModelsDialogContentProps = {
  models: SupportedChatModelId[];
  onSelectModel: (modelId: SupportedChatModelId) => void;
};

export const ModelsDialogContent = ({ 
  models, 
  onSelectModel 
}: ModelsDialogContentProps) => {
  const dialog = useDialog();

  const handleSelect = useCallback(
    (modelId: SupportedChatModelId) => {
      onSelectModel(modelId);
      dialog.close();
    },
    [dialog, onSelectModel],
  );

  return (
    <DialogSearchList
      items={models}
      onSelect={handleSelect}
      filterFn={(modelId, query) => modelId.toLowerCase().includes(query.toLowerCase())}
      renderItem={(modelId, isSelected) => (
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          {modelId}
        </text>
      )}
      getKey={(modelId) => modelId}
      placeHolder="Search models"
      emptyText="No matching models"
    />
  );
};