export function getID(ID: number, setID: (id: number) => void): number {
    setID(ID + 1);
    return ID;
}