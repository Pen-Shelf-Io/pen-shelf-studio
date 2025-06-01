import type { Book } from "@/lib/types";

// Helper function (inspired by user's suggestion)
function bookRecord(
  title: string,
  author: string,
  description: string,
  aiHint: string, // e.g., "fantasy adventure"
  price: number,
  category: string,
  pages: number,
  publishedDate: string, // YYYY-MM-DD
  isbn: string,
  coverImage: string
): Book {
  coverImage = coverImage
    ? bookCover(coverImage)
    : "https://placehold.co/300x450.png";

  const id = title
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[\s\.\,\/#!$%\^&\*;:{}=_`'"<>\~]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return {
    id,
    title,
    author,
    description,
    coverImage,
    aiHint,
    price,
    category,
    pages,
    publishedDate,
    isbn,
  };
}

function bookCover(fileName: string): string {
  return `/images/book-covers/${fileName}`; // Added leading slash
}

export const allBooks: Book[] = [
  bookRecord(
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    "A story of wealth, love, and tragedy in the Jazz Age.",
    "classic literature",
    12.99,
    "Classic",
    180,
    "1925-04-10",
    "9780743273565",
    "the-great-gatsby.jpg"
  ),
  bookRecord(
    "To Kill a Mockingbird",
    "Harper Lee",
    "A powerful story addressing racial injustice in the American South.",
    "legal drama",
    10.5,
    "Classic",
    281,
    "1960-07-11",
    "9780061120084",
    "to-kill-a-mockingbird.jpg"
  ),
  bookRecord(
    "1984",
    "George Orwell",
    "A dystopian novel set in a totalitarian society.",
    "dystopian future",
    9.99,
    "Sci-Fi",
    328,
    "1949-06-08",
    "9780451524935",
    "1984.jpeg"
  ),
  bookRecord(
    "Pride and Prejudice",
    "Jane Austen",
    "A witty romance novel exploring societal norms in 19th-century England.",
    "romance classic",
    8.75,
    "Romance",
    279,
    "1813-01-28",
    "9780141439518",
    "pride-and-prejudice.jpeg"
  ),
  bookRecord(
    "The Hobbit",
    "J.R.R. Tolkien",
    "An adventure of Bilbo Baggins in Middle-earth.",
    "fantasy adventure",
    14.0,
    "Fantasy",
    310,
    "1937-09-21",
    "9780547928227",
    "the-hobbit.jpg"
  ),
  bookRecord(
    "Fahrenheit 451",
    "Ray Bradbury",
    "A novel about a future where books are banned and burned.",
    "dystopian books",
    11.25,
    "Sci-Fi",
    158,
    "1953-10-19",
    "9781451673319",
    "fahrenheit-451.jpg"
  ),
  bookRecord(
    "Moby Dick",
    "Herman Melville",
    "The obsessive quest of Ahab, captain of the whaler Pequod, for revenge on Moby Dick.",
    "sea adventure",
    13.5,
    "Adventure",
    635,
    "1851-10-18",
    "9780142437247",
    "moby-dick.jpg"
  ),
  bookRecord(
    "Jane Eyre",
    "Charlotte Brontë",
    "The story of a young orphan who becomes a governess and finds love.",
    "gothic romance",
    9.2,
    "Romance",
    500,
    "1847-10-16",
    "9780141441146",
    "jane-eyre.jpg"
  ),
  bookRecord(
    "The Catcher in the Rye",
    "J.D. Salinger",
    "A story about teenage angst and alienation.",
    "coming of age",
    10.99,
    "Fiction",
    224,
    "1951-07-16",
    "9780316769488",
    "the-catcher-in-the-rye.jpeg"
  ),
  bookRecord(
    "Animal Farm",
    "George Orwell",
    "An allegorical novella reflecting events leading up to the Russian Revolution.",
    "political satire",
    7.99,
    "Classic",
    112,
    "1945-08-17",
    "9780451526342",
    "animal-farm.jpeg"
  ),
  bookRecord(
    "War and Peace",
    "Leo Tolstoy",
    "A historical novel chronicling the French invasion of Russia.",
    "historical epic",
    18.99,
    "Historical Fiction",
    1225,
    "1869-01-01",
    "9780199232765",
    "war-and-peace.jpg"
  ),
  bookRecord(
    "The Lord of the Rings",
    "J.R.R. Tolkien",
    "An epic high-fantasy novel.",
    "epic fantasy",
    25.0,
    "Fantasy",
    1178,
    "1954-07-29",
    "9780618640157",
    "the-lord-of-the-rings.jpg"
  ),
  bookRecord(
    "Crime and Punishment",
    "Fyodor Dostoevsky",
    "A psychological novel exploring the moral dilemmas of a destitute student.",
    "psychological fiction",
    11.8,
    "Classic",
    430,
    "1866-01-01",
    "9780486415871",
    "crime-and-punishment.png"
  ),
  bookRecord(
    "Wuthering Heights",
    "Emily Brontë",
    "A tale of passionate and destructive love on the Yorkshire moors.",
    "gothic fiction",
    9.5,
    "Classic",
    416,
    "1847-12-01",
    "9780141439556",
    "wuthering-heights.jpg"
  ),
  bookRecord(
    "Brave New World",
    "Aldous Huxley",
    "A dystopian novel about a genetically engineered future society.",
    "sci-fi utopia",
    12.3,
    "Sci-Fi",
    311,
    "1932-01-01",
    "9780060850524",
    "brave-new-world.jpg"
  ),
  bookRecord(
    "The Odyssey",
    "Homer",
    "An epic poem about Odysseus's journey home after the Trojan War.",
    "epic poetry",
    10.0,
    "Mythology",
    541,
    "-800-01-01", // Adjusted for historical date representation
    "9780140268867",
    "the-odyssey.jpg"
  ),
  bookRecord(
    "Sapiens: A Brief History of Humankind",
    "Yuval Noah Harari",
    "An exploration of human history from the Stone Age to the present day.",
    "history science",
    16.5,
    "Non-Fiction",
    464,
    "2011-01-01",
    "9780062316097",
    "sapiens-a-brief-history-of-humankind.jpg"
  ),
  bookRecord(
    "The Martian",
    "Andy Weir",
    "An astronaut's struggle for survival on Mars.",
    "space survival",
    13.75,
    "Sci-Fi",
    369,
    "2011-09-27",
    "9780804139021",
    "the-martian.jpg"
  ),
  bookRecord(
    "Silent Spring",
    "Rachel Carson",
    "A book documenting the adverse environmental effects caused by the indiscriminate use of pesticides.",
    "environment nature",
    14.2,
    "Non-Fiction",
    368,
    "1962-09-27",
    "9780618249060",
    "silent-spring.jpg"
  ),
  bookRecord(
    "Dune",
    "Frank Herbert",
    "A landmark science fiction novel set in the distant future amidst a feudal interstellar society.",
    "desert planet",
    15.99,
    "Sci-Fi",
    412,
    "1965-08-01",
    "9780441172719",
    "dune.jpg"
  ),
];

export const getBookById = (id: string): Book | undefined => {
  return allBooks.find((book) => book.id === id);
};

export const getPaginatedBooks = (
  page: number,
  limit: number,
  booksArray: Book[] = allBooks
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = booksArray.slice(startIndex, endIndex);
  return {
    data: paginatedData,
    currentPage: page,
    totalPages: Math.ceil(booksArray.length / limit),
    totalItems: booksArray.length,
    itemsPerPage: limit,
  };
};
