import styled from "styled-components";
import { RoleSubscriptionEntryDto, RoleSubscriptionEntryDtoRoleEnum, UserRoleSummaryDto } from "../../api/back/models";
import React, { useEffect, useRef, useState } from "react";
import useOutsideClick, { useEscapePress } from "../../utils/useOutsideClick";
import { RoleNames } from "../../utils/format/roles";
import Button from "../UI/Button";
import { appApi } from "../../api/hooks";
import { Table, Tr } from "../UI/Table";

const Modal = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 60%;
  height: 60%;
  background: #1d1f22;

  padding: 40px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
`;

interface Props {
  close(): void;
  user?: UserRoleSummaryDto | null;
}

const RoleRow = (it: RoleSubscriptionEntryDto) => {
  const [editMode, setEditMode] = useState(false);
  const [hiddenDate, setHiddenDate] = useState(it.endTime);

  return (
    <Tr>
      <td>{RoleNames[it.role]}</td>
      <td>helo</td>
      <td>
        {editMode ? (
          <>
            <Button
              onClick={async () => {
                await appApi.adminApi.adminUserControllerUpdateRole({
                  steamId: it.steamId,
                  role: it.role as any,
                  endTime: hiddenDate
                });
                setEditMode(false);
              }}
              className={"small"}
            >
              Сохранить
            </Button>
            <Button onClick={() => setEditMode(false)} className={"small"}>
              Отменить
            </Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)} className={"small"}>
            Изменить время
          </Button>
        )}
      </td>
    </Tr>
  );
};

export const ManageRolesModal = (it: Props) => {
  const [user, setUser] = useState<UserRoleSummaryDto | undefined>(it.user || undefined);
  const comp = useRef(null);

  useEffect(() => {
    setUser(it.user || undefined);
  }, [it.user]);

  useOutsideClick(it.close, comp);
  useEscapePress(it.close);

  if (user)
    return (
      <ModalWrapper>
        <Modal ref={comp}>
          <Button className="small" onClick={it.close}>
            Закрыть
          </Button>

          <Table>
            <thead>
              <Tr>
                <th>Роль</th>
                <th>Время окончания</th>
                <th>Действия</th>
              </Tr>
            </thead>
            <tbody>
              {user.entries.map(r => (
                <RoleRow {...r} />
              ))}
            </tbody>
          </Table>
          <br />

          <Button
            onClick={() => {
              if (!user) return;
              const nu: UserRoleSummaryDto = {
                ...user,
                entries: [
                  ...user.entries,
                  {
                    endTime: new Date().getTime(),
                    role: RoleSubscriptionEntryDtoRoleEnum.OLD,
                    steamId: user.steamId
                  }
                ]
              };

              setUser(nu);
            }}
            className={"small"}
          >
            Добавить Древний
          </Button>
          <br />
          <Button
            onClick={() => {
              if (!user) return;
              const nu: UserRoleSummaryDto = {
                ...user,
                entries: [
                  ...user.entries,
                  {
                    endTime: new Date().getTime(),
                    role: RoleSubscriptionEntryDtoRoleEnum.HUMAN,
                    steamId: user.steamId
                  }
                ]
              };

              setUser(nu);
            }}
            className={"small"}
          >
            Добавить Человек
          </Button>
        </Modal>
      </ModalWrapper>
    );
  return null;
};
