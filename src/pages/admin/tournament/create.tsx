import { useApi } from "../../../api/hooks";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import React, { useState } from "react";
import { CreateTournamentDtoEntryTypeEnum, CreateTournamentDtoStrategyEnum } from "../../../api/back/models";
import styled from "styled-components";
import ImageUploader from "components/UI/ImageUploader";
import { resolveImage } from "../../../utils/resolveImage";
import { useRouter } from "next/router";
import Button from "../../../components/UI/Button";
import Input, { NumberInput } from "../../../components/UI/Input";
import DatePicker from "react-datepicker";
import { Hint } from "../../../components/UI/Hint";
import { colors } from "../../../shared";
import Select from "react-select";
import { bestOfOptions } from "../../../utils/bestOfOptions";

const TournamentImage = styled.img`
  height: 150px;
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.darkBg};
  padding: 20px;

  & + & {
    margin-top: 10px;
  }

  & ${Hint} {
    margin-bottom: 10px;
  }
`;
export default () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://dota2classic.ru/api/static/icons/jugger.png");
  const [startDate, setStartDate] = useState<number>(new Date().getTime() + 1000 * 60 * 60);
  const api = useApi().adminTournament;
  const [bestOfRound, setBestOfRound] = useState(1);
  const [bestOfFinal, setBestOfFinal] = useState(1);
  const [bestOfGrandFinal, setBestOfGrandFinal] = useState(3);
  const [strategy, setStrategy] = useState(CreateTournamentDtoStrategyEnum.SINGLEELIMINATION);
  const [entryType, setEntryType] = useState(CreateTournamentDtoEntryTypeEnum.PLAYER);

  const create = async () => {
    const res = await api.adminTournamentControllerCreateTournament({
      name,
      entryType,
      startDate,
      strategy,
      imageUrl,
      bestOfGrandFinal,
      bestOfRound,
      bestOfFinal
    });

    await router.push(`/admin/tournament/${res.id}`);
  };

  const strategyOptions = [
    {
      value: CreateTournamentDtoStrategyEnum.SINGLEELIMINATION,
      label: "Single elimination"
    },
    {
      value: CreateTournamentDtoStrategyEnum.DOUBLEELIMINATION,
      label: "Double elimination"
    }
  ];
  const entryOptions = [
    {
      value: CreateTournamentDtoEntryTypeEnum.PLAYER,
      label: "Соло 1х1"
    },
    {
      value: CreateTournamentDtoEntryTypeEnum.TEAM,
      label: "Команды 5х5"
    }
  ];

  return (
    <AdminLayout>
      <ImageUploader onChange={e => setImageUrl(resolveImage(e))}>
        <TournamentImage src={imageUrl} />
      </ImageUploader>

      <FormBlock>
        <Hint>Название турнира</Hint>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder={"Имя турнира"} />
      </FormBlock>

      <FormBlock>
        <Hint>Тип турнира</Hint>
        <Select
          value={entryOptions.find(t => t.value === entryType)}
          options={entryOptions}
          onChange={e => setEntryType(e!!.value)}
        />
      </FormBlock>

      <FormBlock>
        <Hint>Вид сетки</Hint>
        <Select
          value={strategyOptions.find(t => t.value === strategy)}
          options={strategyOptions}
          onChange={e => setStrategy(e!!.value)}
        />
      </FormBlock>

      <FormBlock>
        <Hint>Обычный раунд best of</Hint>
        <Select
          value={bestOfOptions.find(t => t.value === bestOfRound)}
          options={bestOfOptions}
          onChange={e => setBestOfRound(e!!.value)}
        />
      </FormBlock>
      <FormBlock>
        <Hint>Финал группы best of</Hint>
        <Select
          value={bestOfOptions.find(t => t.value === bestOfFinal)}
          options={bestOfOptions}
          onChange={e => setBestOfFinal(e!!.value)}
        />
      </FormBlock>
      <FormBlock>
        <Hint>Гранд финал best of</Hint>
        <Select
          value={bestOfOptions.find(t => t.value === bestOfGrandFinal)}
          options={bestOfOptions}
          onChange={e => setBestOfGrandFinal(e!!.value)}
        />
      </FormBlock>

      <FormBlock>
        <Hint>Время начала турнира</Hint>
        <DatePicker
          showTimeSelect
          customInputRef={""}
          dateFormat={"dd MMMM yyyy HH:mm"}
          customInput={<Input className={"iso"} />}
          selected={new Date(startDate)}
          onChange={(date: Date) => setStartDate(date.getTime())}
        />
      </FormBlock>

      <br />
      <br />
      <br />
      <Button onClick={create}>Создать турнир</Button>
    </AdminLayout>
  );
};
