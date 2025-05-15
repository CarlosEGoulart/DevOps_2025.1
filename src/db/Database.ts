import Art from "../model/Art";
import Artist from "../model/Artist";
import Exhibition from "../model/Exhibition";

export default class Database {
    private ArtDb: Art[] = [];
    private ArtistDb: Artist[] = [];
    private ExhibitionDb: Exhibition[] = [];
    private nextArtId: number = 1;
    private nextArtistId: number = 1;
    private nextExhibitionId: number = 1;

    // ART CRUD
    public createArt(title: string, description: string, year: number, imageUrl: string): Art {
        const newArt = new Art(this.nextArtId++, title, description, year, imageUrl);
        this.ArtDb.push(newArt);
        return newArt;
    }

    public readArt(idArt: number): Art | undefined {
        return this.ArtDb.find(art => art.getId() === idArt);
    }

    public readArtByTitle(name: string): Art | undefined {
        return this.ArtDb.find(art => art.getName().toLowerCase() === name.toLowerCase());
    }

    public readAllArts(): Art[] {
        return this.ArtDb;
    }

    public updateArt(idArt: number, title: string, description: string, year: number): boolean {
        const art = this.readArt(idArt);
        if (art) {
            art.setName(title);
            art.setDescription(description);
            art.setYear(year);
            return true;
        }
        return false;
    }

    public deleteArt(idArt: number): Art[] | undefined {
        const index = this.ArtDb.findIndex(art => art.getId() === idArt);
        if (index !== -1) {
            this.ArtDb.splice(index, 1);
            return this.ArtDb;
        }
        return undefined;
    }

    public assignArtistToArt(idArt: number, artist: Artist): boolean {
        const art = this.readArt(idArt);
        if (art && artist) {
            art.setArtist(artist);
            return true;
        }
        return false;
    }

    // ARTIST CRUD
    public createArtist(name: string, bio: string, birthYear: number, instagram: string): Artist {
        const newArtist = new Artist(this.nextArtistId++, name, bio, birthYear, instagram);
        this.ArtistDb.push(newArtist);
        return newArtist;
    }

    public readArtist(idArtist: number): Artist | undefined {
        return this.ArtistDb.find(artist => artist.getId() === idArtist);
    }

    public readArtistByName(name: string): Artist | undefined {
        return this.ArtistDb.find(artist => artist.getName().toLowerCase() === name.toLowerCase());
    }

    public readAllArtists(): Artist[] {
        return this.ArtistDb;
    }

    public updateArtist(idArtist: number, name: string, bio: string, birthYear: number, instagram: string): boolean {
        const artist = this.readArtist(idArtist);
        if (artist) {
            artist.setName(name);
            artist.setBio(bio);
            artist.setBirthYear(birthYear);
            artist.setInstagram(instagram);
            return true;
        }
        return false;
    }

    public deleteArtist(idArtist: number): Artist[] | undefined {
        const index = this.ArtistDb.findIndex(artist => artist.getId() === idArtist);
        if (index !== -1) {
            this.ArtistDb.splice(index, 1);
            return this.ArtistDb;
        }
        return undefined;
    }

    // EXHIBITION CRUD
    public createExhibition(name: string, description: string, artWorks: number[] = []): Exhibition {
        const newExhibition = new Exhibition(this.nextExhibitionId++, name, description, artWorks);
        this.ExhibitionDb.push(newExhibition);
        return newExhibition;
    }

    public readExhibition(idExhibition: number): Exhibition | undefined {
        return this.ExhibitionDb.find(exh => exh.getId() === idExhibition);
    }

    public readExhibitionByName(name: string): Exhibition | undefined {
        return this.ExhibitionDb.find(exh => exh.getName().toLowerCase() === name.toLowerCase());
    }

    public readAllExhibitions(): Exhibition[] {
        return this.ExhibitionDb;
    }

    public updateExhibition(idExhibition: number, name: string, description: string, artWorks: number[]): boolean {
        const exhibition = this.readExhibition(idExhibition);
        if (exhibition) {
            exhibition.setName(name);
            exhibition.setDescription(description);
            exhibition.setArtWorks(artWorks);
            return true;
        }
        return false;
    }

    public deleteExhibition(idExhibition: number): boolean {
        const index = this.ExhibitionDb.findIndex(exh => exh.getId() === idExhibition);
        if (index !== -1) {
            this.ExhibitionDb.splice(index, 1);
            return true;
        }
        return false;
    }

    public addArtToExhibition(idExhibition: number, idArt: number): boolean {
        const exhibition = this.readExhibition(idExhibition);
        const art = this.readArt(idArt);
        if (exhibition && art) {
            const currentArtWorks = exhibition.getArtWorks();
            if (!currentArtWorks.includes(idArt)) {
                exhibition.setArtWorks([...currentArtWorks, idArt]);
                return true;
            }
        }
        return false;
    }

    public removeArtFromExhibition(idExhibition: number, idArt: number): boolean {
        const exhibition = this.readExhibition(idExhibition);
        if (exhibition) {
            const updatedArtWorks = exhibition.getArtWorks().filter(id => id !== idArt);
            exhibition.setArtWorks(updatedArtWorks);
            return true;
        }
        return false;
    }

    public getExhibitionArts(idExhibition: number): Art[] | undefined {
        const exhibition = this.readExhibition(idExhibition);
        if (exhibition) {
            const artIds = exhibition.getArtWorks();
            return artIds.map(id => this.readArt(id)).filter(art => art !== undefined) as Art[];
        }
        return undefined;
    }
}