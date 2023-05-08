let request
let version = 1;

export const initDB = () => {
    return new Promise((resolve) => {
        request = indexedDB.open('Notes');

        request.onupgradeneeded = (event) => {
            let db = event.target.result;

            if (!db.objectStoreNames.contains('Notes')) {
                console.log('Creating users store');
                db.createObjectStore("Notes", { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            let db = event.target.result;
            version = db.version;
            resolve(true);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};
export const addData = (storeName, data) => {
    return new Promise((resolve) => {
        request = indexedDB.open('Notes', version);

        request.onsuccess = (event) => {
            let db = event.target.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message
            if (error) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        };
    });
};


export const getStoreData = (storeName) => {
    return new Promise((resolve) => {
        request = indexedDB.open('Notes');

        request.onsuccess = (event) => {
            let db = event.target.result;
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const res = store.getAll();
            res.onsuccess = () => {
                resolve(res.result);
            };
        };
    });
};
export const changeNoteText = (storeName, data) => {
    return new Promise((resolve) => {
        request = indexedDB.open('Notes', version);

        request.onsuccess = (event) => {
            let db = event.target.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.put(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message
            if (error) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        };
    });
};

export const deleteData = (storeName, key) => {
    return new Promise((resolve) => {
        request = indexedDB.open('Notes', version);

        request.onsuccess = (event) => {
            let db = event.target.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const res = store.delete(key);

            res.onsuccess = () => {
                resolve(true);
            };
            res.onerror = () => {
                resolve(false);
            }
        };
    });
};


