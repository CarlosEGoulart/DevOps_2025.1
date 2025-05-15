import BaseEntity from "./BaseEntity";

export default class Artist extends BaseEntity {
    private bio: string;
    private birthYear: number;
    private instagram: string;

    constructor(id: number, name: string, bio: string, birthYear: number, instagram: string) {
        super(id, name);
        this.bio = bio;
        this.birthYear = birthYear;
        this.instagram = instagram;
    }

    public getBio(): string {
        return this.bio;
    }

    public setBio(bio: string): void {
        this.bio = bio;
    }

    public getBirthYear(): number {
        return this.birthYear;
    }

    public setBirthYear(birthYear: number): void {
        this.birthYear = birthYear;
    }

    public getInstagram(): string {
        return this.instagram;
    }

    public setInstagram(instagram: string): void {
        this.instagram = instagram;
    }

    public getInfo(): string {
        return `Artista: ${this.name}, Bio: ${this.bio}, Ano de Nascimento: ${this.birthYear}, Instagram: ${this.instagram}`;
    }
}