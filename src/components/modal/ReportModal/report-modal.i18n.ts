import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.report-modal";

const messages = defineMessages({
  multipleReports: {
    id: `${INTL_KEY}.multiple_reports`,
    defaultMessage: "Несколько жалоб от одного игрока за один период рассмотра жалоб не суммируются."
  },
  onceAnHour: {
    id: `${INTL_KEY}.once_an_hour`,
    defaultMessage: "Жалобы рассматриваются раз в час автоматически и валидируются модераторами."
  },
  reportsAvailable: {
    id: `${INTL_KEY}.reports_available`,
    defaultMessage: "Жалоб доступно: {reports}"
  },
  reportSent: {
    id: `${INTL_KEY}.report_sent`,
    defaultMessage: "Жалоба отправлена"
  },
  reportError: {
    id: `${INTL_KEY}.report_error`,
    defaultMessage: "Произошла ошибка при отправке жалобы"
  }
});

export default createI18n(messages);
