import { useMemo } from "react";
import type { YmmHandlers } from "../useGarageSync";

export default function useTrackedHandlers(originalHandlers: YmmHandlers, markManualChange: () => void): YmmHandlers {
  return useMemo(
    () => ({
      onYearChange: (value: string) => {
        markManualChange();
        originalHandlers.onYearChange(value);
      },
      onMakeChange: (value: string) => {
        markManualChange();
        originalHandlers.onMakeChange(value);
      },
      onModelChange: (value: string) => {
        markManualChange();
        originalHandlers.onModelChange(value);
      },
      onTrimChange: (value: string) => {
        markManualChange();
        originalHandlers.onTrimChange(value);
      },
      onDriveChange: (value: string) => {
        markManualChange();
        originalHandlers.onDriveChange(value);
      },
    }),
    [originalHandlers, markManualChange]
  );
}

export type { YmmHandlers };
