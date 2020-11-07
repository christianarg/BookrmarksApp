// src/mocks.js
// 1. Import mocking utils.
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Users, { UserData } from './users';

const testUsers : UserData[] = [{ name: 'Bob' }];

// 2. Define request handlers and response resolvers.
const server = setupServer(
    rest.get('/users.json', (req, res, ctx) => {
        return res(
            ctx.delay(100),
            ctx.status(202, 'Mocked status'),
            ctx.json(testUsers),
        )
    }),
)

// 3. Start the Service Worker.
//worker.start();
server.listen();

test('should fetch users', async () => {
    // ACT
    const users = await Users.all();
    // ASSERT
    expect(users[0].name).toBe(testUsers[0].name);
});