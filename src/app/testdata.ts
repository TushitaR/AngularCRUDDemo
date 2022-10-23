import { InMemoryDbService } from 'angular-in-memory-web-api';
export class TestData implements InMemoryDbService {
    createDb() {
        let bookDetails = [
            { id: 1, name: 'Diary of a young girl', category: 'non-fiction', writer: 'Anne Frank' }
        ];
        return {books:bookDetails};
    }
}