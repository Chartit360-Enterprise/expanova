"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.TaskStatus = exports.TaskType = exports.DocumentType = void 0;
var DocumentType;
(function (DocumentType) {
    DocumentType["PASSPORT"] = "passport";
    DocumentType["NIE_TIE"] = "nie_tie";
    DocumentType["EMPADRONAMIENTO"] = "empadronamiento";
    DocumentType["RENTAL_CONTRACT"] = "rental_contract";
    DocumentType["BANK_STATEMENT"] = "bank_statement";
    DocumentType["WORK_CONTRACT"] = "work_contract";
    DocumentType["SIP_CARD"] = "sip_card";
    DocumentType["DRIVING_LICENSE"] = "driving_license";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var TaskType;
(function (TaskType) {
    TaskType["NIE_APPLICATION"] = "nie_application";
    TaskType["TIE_RENEWAL"] = "tie_renewal";
    TaskType["EMPADRONAMIENTO"] = "empadronamiento";
    TaskType["SIP_REGISTRATION"] = "sip_registration";
    TaskType["BANK_ACCOUNT"] = "bank_account";
    TaskType["DRIVING_LICENSE_EXCHANGE"] = "driving_license_exchange";
    TaskType["TAX_DECLARATION"] = "tax_declaration";
    TaskType["SOCIAL_SECURITY"] = "social_security";
    TaskType["WORK_PERMIT"] = "work_permit";
    TaskType["FAMILY_REUNION"] = "family_reunion";
})(TaskType || (exports.TaskType = TaskType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["NOT_STARTED"] = "not_started";
    TaskStatus["DOCUMENTS_NEEDED"] = "documents_needed";
    TaskStatus["READY_TO_SUBMIT"] = "ready_to_submit";
    TaskStatus["APPOINTMENT_NEEDED"] = "appointment_needed";
    TaskStatus["APPOINTMENT_SCHEDULED"] = "appointment_scheduled";
    TaskStatus["IN_PROGRESS"] = "in_progress";
    TaskStatus["WAITING_RESPONSE"] = "waiting_response";
    TaskStatus["COMPLETED"] = "completed";
    TaskStatus["EXPIRED"] = "expired";
    TaskStatus["CANCELLED"] = "cancelled";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["TASK_REMINDER"] = "task_reminder";
    NotificationType["DEADLINE_WARNING"] = "deadline_warning";
    NotificationType["APPOINTMENT_AVAILABLE"] = "appointment_available";
    NotificationType["DOCUMENT_EXPIRING"] = "document_expiring";
    NotificationType["OFFICIAL_NOTIFICATION"] = "official_notification";
    NotificationType["SYSTEM_UPDATE"] = "system_update";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
//# sourceMappingURL=types.js.map