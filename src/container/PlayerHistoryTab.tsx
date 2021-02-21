import PlayerMatch from "../components/PlayerMatch";
import Pagination from "../components/Pagination";
import React, { useState } from "react";
import { useApi } from "../api/hooks";
import { AdBanner } from "../components/ads/ads";
import { Table, Tr } from "../components/UI/Table";
import i18n from "pages-i18n/profile/profile.i18n";
interface Props {
  steam_id: string;
}
export default (props: Props) => {
  const [page, setPage] = useState(0);

  const { data } = useApi().matchApi.useMatchControllerPlayerMatches(props.steam_id, page);

  return (
    <>
      <Table className={"compact"}>
        <thead>
          <Tr>
            <th>{i18n.id}</th>
            <th>{i18n.mode}</th>
            <th style={{ width: 20, textOverflow: "ellipsis" }}>{i18n.duration}</th>
            <th>{i18n.hero}</th>
            <th className={"omit"}>{i18n.items}</th>
            <th>{i18n.result}</th>
            <th style={{ width: 40 }}>K</th>
            <th style={{ width: 40 }}>D</th>
            <th style={{ width: 40 }}>A</th>
            <th className={"omit"} style={{ width: 40 }}>
              L/D
            </th>
            <th className={"omit"} style={{ width: 40 }}>
              GPM/XPM
            </th>
          </Tr>
        </thead>
        <tbody>
          {data?.data.map((it, index) => (
            <PlayerMatch index={index} player={props.steam_id} match={it} />
          ))}
        </tbody>
      </Table>
      <br />
      <AdBanner />
      {data && (
        <Pagination
          pages={data?.pages}
          page={page}
          next={() => setPage(page + 1)}
          prev={() => setPage(Math.max(0, page - 1))}
        />
      )}
    </>
  );
};
