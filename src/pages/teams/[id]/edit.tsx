import { TournamentLayout } from "../../../components/Layout";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../../../components/Form";
import Router, { useRouter } from "next/router";
import { TeamEntity, useTeamQuery, useUpdateTeamMutation } from "../../../generated/sdk";
import { BaseGQLConfig } from "../../../shared";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { LogoContainer } from "./index";

export default () => {
  const { id } = useRouter().query;

  const { data, refetch } = useTeamQuery({
    ...BaseGQLConfig,
    variables: {
      id: Number(id)
    }
  });

  const team: TeamEntity | undefined = data?.Team as any;
  const { register, handleSubmit, setValue } = useForm();

  const [updateTeam] = useUpdateTeamMutation();

  const onSubmit = async (values: any) => {
    await updateTeam({
      variables: {
        id: Number(id),
        name: values.name,
        tag: values.tag
      }
    });

    await Router.push(`/teams/${id}`);
  };

  useEffect(() => {
    if (!team) return;
    setValue("name", team.name);
    setValue("tag", team.tag);
  }, [data]);

  return (
    <TournamentLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ justifyContent: "center", display: "flex", marginBottom: 20 }}>
          <LogoContainer team={team} isMember={true} revalidate={refetch} />
        </div>
        <Input name="name" ref={register} />
        <Input name="tag" ref={register} />

        <br />
        <Button>Сохранить</Button>
      </Form>
    </TournamentLayout>
  );
};
