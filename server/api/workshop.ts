import { MOCK_WORKSHOPS } from "~/../shared/utils/mockData";

// TODO: implement get by id, get all, create, update, delete
// TODO: make useWorkshop composable use this api rather than mocking the server side functionality
export default defineEventHandler(() => MOCK_WORKSHOPS[0]);
