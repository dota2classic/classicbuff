import { useApi } from "../../api/hooks";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Button from "components/UI/Button";
import { RoleSubscriptionEntryDto, RoleSubscriptionEntryDtoRoleEnum } from "../../api/back/models";
import { RoleNames } from "../../utils/format/roles";
import DatePicker from "react-datepicker";
import Input from "../UI/Input";
import { Table, Tr } from "../UI/Table";

interface Props {
  steamId: string;
}

const RoleBlock = styled.div``;

const RoleRow = (props: RoleSubscriptionEntryDto) => {
  const [endTime, setEndTime] = useState(new Date(props.endTime));
  const api = useApi().adminApi;

  const isExpired = endTime.getTime() < new Date().getTime();

  const commitChanges = (d: Date) => {
    return api.adminUserControllerUpdateRole({
      steamId: props.steamId,
      role: props.role as any,
      endTime: d.getTime()
    });
  };

  const removeRole = () => {
    const d = new Date();

    d.setMonth(d.getMonth() - 2);
    setEndTime(d);
    return commitChanges(d);
  };

  const addMonth = () => {
    const d = new Date(endTime);
    d.setMonth(endTime.getMonth() + 1);
    setEndTime(d);
    return commitChanges(d);
  };

  return (
    <Tr>
      <td className={`ROLE_${props.role}`}>{RoleNames[props.role]}</td>
      <td>
        {isExpired ? (
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
        <Button className="small" onClick={removeRole}>
          Убрать роль
        </Button>
        <span style={{ marginLeft: 10 }} />
        <Button className="small" onClick={addMonth}>
          Добавить месяц
        </Button>
      </td>
    </Tr>
  );
};
export const UserRoleSetup = ({ steamId }: Props) => {
  const { data: roleData } = useApi().adminApi.useAdminUserControllerRoleOf(steamId);

  const [combinedRoles, setCombinedRoles] = useState<RoleSubscriptionEntryDto[]>([]);

  const managedRoles: RoleSubscriptionEntryDtoRoleEnum[] = [
    RoleSubscriptionEntryDtoRoleEnum.OLD,
    RoleSubscriptionEntryDtoRoleEnum.HUMAN
  ];

  useEffect(() => {
    const tmp: RoleSubscriptionEntryDto[] = [];
    if (roleData) {
      tmp.push(...roleData.entries);
    }
    managedRoles.forEach(t => {
      if (tmp.find(z => z.role === t)) {
        // if there is role, skip
      } else {
        const endTime = new Date();
        endTime.setDate(endTime.getDate() - 1);
        tmp.push({
          role: t,
          endTime: endTime.getTime(),
          steamId: steamId
        });
      }
    });
    setCombinedRoles(tmp);
  }, [roleData]);

  return (
    <RoleBlock>
      <Table>
        <thead>
          <Tr>
            <th>Роль</th>
            <th>Время окончания</th>
            <th>Действия</th>
          </Tr>
        </thead>

        <tbody>
          {combinedRoles.map(z => (
            <RoleRow {...z} />
          ))}
        </tbody>
      </Table>
    </RoleBlock>
  );
};
