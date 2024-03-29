import styled from "styled-components";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useApi } from "../../../api/hooks";
import { PlayerSummaryDto } from "../../../api/back/models";
import { colors } from "../../../shared";
import cx from "classnames";
const Preview = styled.div`
  position: relative;

  overflow: visible;
  display: flex;
`;

const QuickScope = styled.div`
  position: absolute;
  right: -10px;

  &.compact {
    padding: 5px;
  }

  color: ${colors.primaryText};
  background: ${colors.evenDarkerBg};

  display: flex;
  flex-direction: column;
  padding: 20px;

  z-index: 100;
`;

export interface Props {
  steam_id: string | number;
  compact?: boolean;
  className?: string;
}
export const PlayerHover = (p: PropsWithChildren<Props>) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [data, setData] = useState<PlayerSummaryDto | undefined>();

  const api = useApi().playerApi;
  useEffect(() => {
    if (previewVisible && !data) {
      api.playerControllerPlayerSummary(p.steam_id.toString()).then(setData);
    }
  }, [previewVisible]);

  return (
    <Preview
      className={p.className}
      onMouseEnter={() => setPreviewVisible(true)}
      onMouseLeave={() => setPreviewVisible(false)}
    >
      {p.children}
      {previewVisible && data && (
        <QuickScope className={cx(p.compact && "compact")}>
          <span>{data.rank} ранг</span>
          <span>{data.mmr} mmr</span>
        </QuickScope>
      )}
    </Preview>
  );
};
