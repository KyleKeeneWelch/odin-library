# The Odin Project - Library
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Objects` and `Constructors` taught in the previous lessons to create effective data structures to manipulate within a library-based application. 

The project aims to display a catalogue of books that the user enters into the form modal and shows the book's details and whether it has been read. A book's title, author, number of pages are the details shown. If the "have you read" checkbox is checked, the book container displays a green background color while red is displayed otherwise. The checkbox on the container will flip the read status so the user is able to update the application once they have read the book. A "remove" button is also provided so that the user can delete a book entry from the library catalogue.

Much of the data is handled through an Object-Oriented approach in JavaScript where a book and a library represents individual data structures with their own properties and methods. The user interface is reflected upon the values stored in the created book and library objects. The library will maintain an array of books of which will store many book objects and the grid container in the user interface will update to match the books found within.

## Features

- **Flexbox and Grid** - Uses flexbox and grid tools to position and structure page elements according to the design.

- **JavaScript Validation API** - Uses JavaScript Validation API to handle the validation of the add book form manually. It performs checks upon the placed validation rules on the fields in the form and the form will accept or reject values based on the validity of the fields. The preventDefault() function prevents the form from sending the data and allows us to alter the contents in the page without a refresh.

- **Error Messages and Borders** - A flagged check will provide the appropriate error message below the triggering field so that the user is able to enact on the error. An invalid or crossed validation rule will change the border of a field to red while valid changes to green.

- **Keyboard Support** - Allows the user to use the "escape" and "enter" keys to close the form modal and submit the entry.