
export default class CollectionUtil {
    static getLastElement(collection: Array<any>) {
        if (!collection || collection.length === 0) {
            return null;
        }
        return collection[collection.length - 1];
    }
}
