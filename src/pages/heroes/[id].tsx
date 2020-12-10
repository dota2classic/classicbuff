import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BaseGQLConfig } from "../../shared";
// import { Match, useHeroHistoryQuery } from "../../generated/sdk";

export default () => {
  const { id } = useRouter().query;

  const [page, setPage] = useState(0);

  const hero = id as string;

  // const { data } = useHeroHistoryQuery({
  //   ...BaseGQLConfig,
  //   variables: {
  //     page,
  //     hero
  //   }
  // });

  return null;
  // return (
  //   <Layout title={<h3>{heroName(id as string)}</h3>}>
  //     <Head>
  //       <title>{heroName(id as string)} - dota2classic.ru</title>
  //     </Head>
  //     <Table className="compact">
  //       <thead>
  //         <Tr>
  //           <th>ID</th>
  //           <th>Режим</th>
  //           <th style={{ width: 20, textOverflow: "ellipsis" }}>Длительность</th>
  //           <th>Герой</th>
  //           <th className={"omit"}>Предметы</th>
  //           <th>Результат</th>
  //           <th style={{ width: 40 }}>K</th>
  //           <th style={{ width: 40 }}>D</th>
  //           <th style={{ width: 40 }}>A</th>
  //           <th className={"omit"} style={{ width: 40 }}>
  //             L/D
  //           </th>
  //           <th className={"omit"} style={{ width: 40 }}>
  //             GPM/XPM
  //           </th>
  //         </Tr>
  //       </thead>
  //       <tbody>
  //         {data?.HeroMatches.data?.map((it, index) => (
  //           <PlayerMatch player={it.players.find(it => it.hero === id)!!} index={index} match={it} />
  //         ))}
  //       </tbody>
  //     </Table>
  //
  //     {data?.HeroMatches && (
  //       <Pagination
  //         pages={data?.HeroMatches.pages}
  //         page={page}
  //         next={() => setPage(page + 1)}
  //         prev={() => setPage(Math.max(0, page - 1))}
  //       />
  //     )}
  //   </Layout>
  // );
};
