import React from "react";
import Layout from "components/Layout";
import { useApi } from "api/hooks";
import GenericTournamentBlock from "components/UI/blog/tournament/GenericTournamentBlock";
import styled from "styled-components";
import { AppRouter } from "utils/route";
import { colors } from "shared";
import Head from "next/head";
import { PROD_URL } from "config";

const BlockTitle = styled.div`
  font-size: 40px;
  color: ${colors.primaryText};
  text-align: center;
  margin: 40px 20px 20px;
`;

const Score = styled.span`
  color: ${colors.blueHighlight2};
`;
const Blocks = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  & > div + div {
    margin-left: 20px;
  }
`;

const BlockInfo = styled.div`
  margin-top: 20px;
  padding: 20px;
  line-height: 40px;
  text-align: center;
`;

const Team = styled.span`
  &.winner {
    color: ${colors.dota.green};
  }
  &.loser {
    color: ${colors.dota.red};
  }
`;

const PrizePoolDistribution = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  & > div + div {
    margin-top: 10px;
  }
`;

export default () => {
  const { data } = useApi().tournament.useTournamentControllerGetTournament(41);

  return (
    <Layout landing>
      <Head>
        <title>Итоги турнира DOTA2CLASSIC.RU OPEN CUP #1</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.84 2015 года"
        />
      </Head>

      <Blocks>
        <GenericTournamentBlock
          small
          img="https://i.pinimg.com/originals/00/93/9d/00939dff0059e823658afe98bb6d87a4.jpg"
        >
          23 команды
        </GenericTournamentBlock>
        <GenericTournamentBlock
          small
          link={AppRouter.tournament.bracket(41)}
          hover={
            <PrizePoolDistribution>
              <div>20 игр в верхней сетке</div>
              <div>18 игр в нижней сетке</div>
              <div>3 игры в гранд финале</div>
            </PrizePoolDistribution>
          }
          img="https://wallpaperaccess.com/full/671214.jpg"
        >
          41 игра сыграна за один день
        </GenericTournamentBlock>
        <GenericTournamentBlock
          small
          hover={
            <PrizePoolDistribution>
              <div>1 место 10.000 рублей</div>
              <div>2 место 5.000 рублей</div>
              <div>3 место 3.000 рублей</div>
              <div>4 место 2.000 рублей</div>
            </PrizePoolDistribution>
          }
          img="https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7f/Alchemist_update_splash.jpeg/revision/latest/scale-to-width-down/2000?cb=20120420045137"
        >
          <span>20.000 рублей призовой фонд</span>
        </GenericTournamentBlock>
      </Blocks>

      <Blocks>
        <GenericTournamentBlock
          hover={
            <BlockInfo>
              Команда <Team className="winner">Оу Дядь</Team> победила у{" "}
              <Team className="loser">The Magnificent Five</Team> со счетом{" "}
              <Score>
                <span>17:2</span>
              </Score>
            </BlockInfo>
          }
          link={AppRouter.match(12399)}
          img="https://img3.goodfon.ru/original/1280x1024/c/b9/dota-2-tiny-io-wisp.jpg"
        >
          <span>Самая быстрая игра</span>
          <br />
          <span>9 минут 46 секунд</span>
        </GenericTournamentBlock>

        <GenericTournamentBlock
          hover={
            <BlockInfo>
              Команда <Team className="loser">Team 1% Basic </Team> победила у{" "}
              <Team className="winner">hatake lox</Team> со счетом{" "}
              <Score>
                <span>73:18</span>
              </Score>
            </BlockInfo>
          }
          link={AppRouter.match(12419)}
          img="https://i.imgur.com/D5hZU5e.jpg"
        >
          <span>Самая долгая игра</span>
          <br />
          <span>40 минут 40 секунд</span>
        </GenericTournamentBlock>
      </Blocks>

      <Blocks>
        <GenericTournamentBlock
          small
          hover={
            <BlockInfo>
              Игрок <Team className="winner">アイドル</Team> команды <Team className="loser">hatake lox</Team> завершил
              игру со счетом <Score>3/20/8</Score>
            </BlockInfo>
          }
          link={AppRouter.match(12419)}
          img="http://pm1.narvii.com/6537/cfb62a2c618407602160ee86df2e1725672311ab_00.jpg"
        >
          <span>Наибольшее количество смертей</span>
          <br />
          <span>20</span>
        </GenericTournamentBlock>
        <GenericTournamentBlock
          small
          hover={
            <BlockInfo>
              Игрок без никнейма команды <Team className="loser">Team 1% Basic</Team> завершил игру со счетом{" "}
              <Score>30/3/19</Score>
            </BlockInfo>
          }
          link={AppRouter.match(12419)}
          img="https://static-prod.weplay.tv/2020-04-25/009126c750c9b1850106c08087578f3e_large_cover.1E1D24-B1A5AA-7898A5.jpeg"
        >
          <span>Наибольшее количество убийств</span>
          <br />
          <span>30</span>
        </GenericTournamentBlock>

        <GenericTournamentBlock
          small
          hover={
            <BlockInfo>
              Игрок <Team className="winner">Parasha</Team> команды <Team className="loser">Team 1% Basic</Team>{" "}
              завершил игру со счетом <Score>12/6/32</Score>
            </BlockInfo>
          }
          link={AppRouter.match(12419)}
          img="https://i.pinimg.com/originals/63/37/03/633703f460655c58cefb57dc3c31f564.jpg"
        >
          <span>Наибольшее количество ассистов</span>
          <br />
          <span>32</span>
        </GenericTournamentBlock>
      </Blocks>

      <Blocks>
        <GenericTournamentBlock
          hover={<BlockInfo>Omniknight был выбран 16 раз, победил в 7 играх со средним KDA 2.7</BlockInfo>}
          img="https://cdn.mos.cms.futurecdn.net/15d77350aa34c9a357cdfa7bd7acf45e.jpg"
        >
          <span>Самый частый герой</span>
          <br />
          <span>Omniknight - 16 пиков, 43% winrate</span>
        </GenericTournamentBlock>
        <GenericTournamentBlock
          hover={
            <BlockInfo>
              Игрок <Team className="winner">?)</Team> команды <Team className="loser">Kirieshka team</Team> завершил
              игру со счетом <Score>16/0/23</Score>
            </BlockInfo>
          }
          link={AppRouter.match(12389)}
          img="https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/5ba93b9808ea9cda9f00000c.jpeg"
        >
          <span>Наибольшее КДА</span>
          <br />
          <span>39</span>
        </GenericTournamentBlock>
      </Blocks>

      <BlockTitle>Самые сильные герои</BlockTitle>

      <Blocks>
        <GenericTournamentBlock small img="https://miro.medium.com/max/3840/1*M8WpCjTWbANmxIx9K3crAA.jpeg">
          <span>Invoker</span>
          <br />
          <span>
            7 пиков, 85% winrate
            <br />
            <br /> средний KDA 13.7
          </span>
        </GenericTournamentBlock>
        <GenericTournamentBlock
          small
          img="https://static-prod.weplay.tv/2020-05-19/9260ecdb23e2b733e23ffabea47a9d9a_large_cover.57372D-DB9064-80BBBE.jpeg"
        >
          <span>Brewmaster</span>
          <br />
          <span>
            9 пиков, 88% winrate
            <br />
            <br /> средний KDA 5.1
          </span>
        </GenericTournamentBlock>
        <GenericTournamentBlock
          small
          img="https://besthqwallpapers.com/Uploads/25-3-2019/84850/thumb2-drow-ranger-female-archer-dota-2-artwork-warriors.jpg"
        >
          <span>Drow ranger</span>
          <br />
          <span>
            9 пиков, 78% winrate
            <br />
            <br /> средний KDA 9.3
          </span>
        </GenericTournamentBlock>
      </Blocks>

      <BlockTitle>Самые слабые герои</BlockTitle>

      <Blocks>
        <GenericTournamentBlock
          small
          img="https://i.pinimg.com/originals/95/50/8b/95508b994ddb9e242cc21f4fcdb29acf.jpg"
        >
          <span>Sven</span>
          <br />
          <span>
            4 пика, 0% winrate
            <br />
            <br /> средний KDA 0.9
          </span>
        </GenericTournamentBlock>
        <GenericTournamentBlock
          small
          img="https://pages.firstblood.io/pages/wp-content/uploads/2018/11/timbersaw-hero-guide-970x570.jpg"
        >
          <span>Timbersaw</span>
          <br />
          <span>
            4 пика, 25% winrate
            <br />
            <br /> средний KDA 1.1
          </span>
        </GenericTournamentBlock>
        <GenericTournamentBlock
          small
          img="https://pages.firstblood.io/pages/wp-content/uploads/2019/02/lion-hero-guide-970x570.jpg"
        >
          <span>Lion</span>
          <br />
          <span>
            4 пика, 0% winrate
            <br />
            <br /> средний KDA 1.5
          </span>
        </GenericTournamentBlock>
      </Blocks>

      <BlockTitle>Призовые места</BlockTitle>

      <Blocks>
        <GenericTournamentBlock
          small
          link={AppRouter.team.team("9b83f496-b65d-445d-abd3-311e8b3670f0")}
          img={`${PROD_URL}/static/73998c6a2f49f2fc20117263a8968970.png`}
        >
          <span>NASOS</span>
          <br />
          <span>
            2 место
            <br />
            <br /> 5.000 рублей
          </span>
        </GenericTournamentBlock>

        <GenericTournamentBlock
          link={AppRouter.team.team("7e594690-994c-466a-a171-3f94b64abe00")}
          small
          img={`https://cdn.discordapp.com/attachments/814766214172639297/817836467178962974/image.png`}
        >
          <span>Оу Дядь</span>
          <br />
          <span>
            1 место
            <br />
            <br /> 10.000 рублей
          </span>
        </GenericTournamentBlock>

        <GenericTournamentBlock
          small
          link={AppRouter.team.team("e4ed3aa1-42a4-4dfe-ac7b-306c992bc163")}
          img={`${PROD_URL}/static/daa7ccad1b82174abc683efdec5103081.png`}
        >
          <span>M and Ms</span>
          <br />
          <span>
            3 место
            <br />
            <br /> 3.000 рублей
          </span>
        </GenericTournamentBlock>
      </Blocks>
    </Layout>
  );
};
