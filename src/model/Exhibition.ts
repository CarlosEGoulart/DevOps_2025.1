import BaseEntity from "./BaseEntity";

export default class Exhibition extends BaseEntity {
    private description: string;
    private artWorks: number[];

    constructor(id: number, name: string, description: string, artWorks: number[] = []) {
        super(id, name);
        this.description = description;
        this.artWorks = artWorks;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getArtWorks(): number[] {
        return this.artWorks;
    }

    public setArtWorks(artWorks: number[]): void {
        this.artWorks = artWorks;
    }

    public getInfo(): string {
        return `Exposição: ${this.name}, Descrição: ${this.description}, Obras: ${this.artWorks.length}`;
    }
}