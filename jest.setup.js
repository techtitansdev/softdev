import '@testing-library/jest-dom/extend-expect';
import { server } from "./msw-setup";

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
