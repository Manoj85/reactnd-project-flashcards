
## Mobile Flashcards

UdaciCards project is a mobile application (Android or iOS - or both) that 
allows users to study collections of flashcards. 
The app will allow users 
- to create different categories of flashcards called "decks", 
- add flashcards to those decks
- then take quizzes on those decks.


This project encompasses the fundamental aspects of building a native application 
including handling infinite lists, routing, and user input. 


### Installation

 * Install `expo` on you PC and mobile as well
 * cd `reactnd-project-flashcards`
 * `yarn install`
 * `yarn start`

 To view the app with live reloading, point the Expo app to the QR code.
 You'll find the QR scanner on the Projects tab of the app.
 
 Press Ctrl+C at any time to stop.
 
    Press a to open Android device or emulator, or i to open iOS emulator.
    Press q to display QR code.
    Press r to restart packager, or R to restart packager and clear cache.
    Press d to toggle development mode. (current mode: development)

### Specific Requirements

 * Use create-react-native-app to build your project.
 * Allow users to create a deck which can hold an unlimited number of cards.
 * Allow users to add a card to a specific deck.
 * The front of the card should display the question.
 * The back of the card should display the answer.
 * Users should be able to quiz themselves on a specific deck and receive a score once they're done.
 * Users should receive a notification to remind themselves to study if they haven't already for that day.

### Views

Our application will have five views.

   **Deck List View (Default View)**
   
        displays the title of each Deck
        displays the number of cards in each deck

   **Individual Deck View**

        displays the title of the Deck
        displays the number of cards in the deck
        displays an option to start a quiz on this specific deck
        An option to add a new question to the deck

   **Quiz View**
    
        displays a card question
        an option to view the answer (flips the card)
        a "Correct" button
        an "Incorrect" button
        the number of cards left in the quiz
        Displays the percentage correct once the quiz is complete

   **New Deck View**
    
        An option to enter in the title for the new deck
        An option to submit the new deck title

   **New Question (or Card) View**
    
        An option to enter in the question
        An option to enter in the answer
        An option to submit the new question


### Data

We'll use AsyncStorage to store our decks and flashcards. 
Redux is optional for this project.

Using AsyncStorage you'll manage an object whose shape is similar to this:


```json
{
  "React": {
    "title": "React",
    "questions": [
      {
        "question": "What is React?",
        "answer": "A library for managing user interfaces"
      },
      {
        "question": "Where do you make Ajax requests in React?",
        "answer": "The componentDidMount lifecycle event"
      }
    ]
  },
  "JavaScript": {
    "title": "JavaScript",
    "questions": [
      {
        "question": "What is a closure?",
        "answer": "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
}
```

Notice each deck creates a new key on the object. 
* Each deck has a `title` and a `questions` key. 
* title is the `title` for the specific deck and questions is an `array of questions and answers` for that deck.

### Methods

To manage your AsyncStorage database, we created four different helper methods.

* **getDecks**: return all of the decks along with their titles, questions, and answers.
* **getDeck**: take in a single id argument and return the deck associated with that id.
* **saveDeckTitle**: take in a single title argument and add it to the decks.
* **addCardToDeck**: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

### References

1.	https://medium.com/@arpith/disabling-buttons-in-react-native-dfd683c25634
2.	https://moduscreate.com/blog/react-native-listview-with-section-headers/
3.	https://facebook.github.io/react-native/docs/platform-specific-code.html
4.	https://medium.com/the-react-native-log/understanding-react-native-flexbox-layout-7a528200afd4
5.	https://www.styled-components.com/
6.	https://facebook.github.io/react-native/docs/statusbar.html#props
7.	https://reactnavigation.org/docs/navigators/tab
8.	https://medium.com/@swathylenjini/stack-navigation-in-react-native-2cd00374ff3a
9.	https://reactnavigation.org/docs/navigators/drawer
10. http://browniefed.com/react-native-animation-book/api/ANIMATED_REMOVE_LISTENERS.html
