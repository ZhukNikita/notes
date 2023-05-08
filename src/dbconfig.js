export const DBConfig = {
    name: 'Notes',
    version: 3,
    objectStoresMeta: [
        {
            store: 'notes',
            storeConfig: { keyPath: 'id', autoIncrement: false },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'id', keypath: 'id', options: { unique: false } },
                { name: 'date', keypath: 'date', options: { unique: false } },
                { name: 'text', keypath: 'text', options: { unique: false } },
            ]
        }
    ]
};