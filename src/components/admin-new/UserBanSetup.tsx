import { useApi } from "../../api/hooks";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { Table, Tr } from "../UI/Table";

interface Props {
  steamId: string;
}

export const UserBanSetup = ({ steamId }: Props) => {
  const { data } = useApi().adminApi.useAdminUserControllerBanOf(steamId);
  const [endTime, setEndTime] = useState(new Date(new Date().setDate(new Date().getDate() - 1)));

  const api = useApi().adminApi;

  const commitChanges = (d: Date) => {
    return api.adminUserControllerBanId(steamId, {
      endTime: d.getTime()
    });
  };
  useEffect(() => {
    if (data) {
      setEndTime(new Date(data.banStatus.bannedUntil));
    }
  }, [data]);

  const isBanActive = endTime.getTime() < new Date().getTime();

  return (
    <Table>
      <thead>
        <Tr>
          <th>Время окончания</th>
          <th>Действия</th>
        </Tr>
      </thead>

      <tbody>
        <Tr>
          <td>
            {isBanActive ? (
              <DatePicker
                customInputRef={""}
                dateFormat={"dd MMMM yyyy"}
                customInput={<Button className={"small"}>Назначить</Button>}
                selected={endTime}
                onChange={(date: Date) => {
                  setEndTime(date);
                  return commitChanges(date);
                }}
              />
            ) : (
              <DatePicker
                customInputRef={""}
                dateFormat={"dd MMMM yyyy"}
                customInput={<Input className={"iso"} />}
                selected={endTime}
                onChange={(date: Date) => {
                  setEndTime(date);
                  return commitChanges(date);
                }}
              />
            )}
          </td>

          <td>
            <Button
              className="small"
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() - 2);
                setEndTime(d);
                return commitChanges(d);
              }}
            >
              Разбанить
            </Button>
            <span style={{ marginLeft: 20 }} />
            <Button
              className="small"
              onClick={() => {
                const d = new Date();
                d.setFullYear(2048);
                setEndTime(d);
                return commitChanges(d);
              }}
            >
              Перма бан
            </Button>
          </td>
        </Tr>
      </tbody>
    </Table>
  );
};
