import { _createStarships, _validateData, _getStarshipCount } from "../utils"

export default class StarWarsUniverse {
    constructor() {
        this.starships = []
    }

    get theBestStarship() {
        let max = 0;
        let id = 0
        for (let i = 0; i < this.starships.length; i++) {
            if(this.starships[i].maxDaysInSpace > max) {
                max = this.starships[i].maxDaysInSpace
                id = i
            }
        }

        console.log(this.starships[id])
        return this.starships[id];
    }

    async init() {
        await _getStarshipCount()
        let starshipsArray = await _createStarships();
        let starshipsValidData = _validateData(starshipsArray)
        starshipsValidData.forEach(element => {
            this.starships.push(element);
        })
    }
}
