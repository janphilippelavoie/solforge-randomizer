// Randomize array in-place using Durstenfeld shuffle (optimized Fisher-Yates) 
export default function shuffle(array) {
    var currentIndex = array.length;
    
    // Everything left of currentIndex is unshuffled, everything right of it is shuffled
    while(currentIndex > 0) {
        // Pick a random card left of currentIndex
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--; // Decrement first: converts from (1, length) to (0, length-1)

        // Swap it with currentIndex
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}