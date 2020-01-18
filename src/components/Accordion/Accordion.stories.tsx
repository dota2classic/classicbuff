import React from "react";
import Accordion from "./Accordion";

export default {
  title: "Design System/Accordion",

  parameters: {
    component: Accordion
  }
};

const content = (
  <>
    <div>123</div>
    <div>432</div>
    <div>123</div>
    <div>432</div>
    <div>123</div>
    <div>432</div>
    <div>123</div>
    <div>432</div>
    <div>123</div>
    <div>432</div>
  </>
);

export const all = () => (
  <div style={{ width: 260 }}>
    <Accordion title="Дата создания" additional="4">
      {content}
    </Accordion>
    <Accordion title="Клиент">{content}</Accordion>
    <Accordion title="Марка">{content}</Accordion>
  </div>
);
