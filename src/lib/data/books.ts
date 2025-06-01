import type { Book } from "@/lib/types";

// Helper function (inspired by user's suggestion)
function bookRecord(
  id: string,
  title: string,
  author: string,
  description: string,
  coverImagePlaceholderKeywords: string, // e.g., "fantasy adventure"
  price: number,
  category: string,
  pages: number,
  publishedDate: string, // YYYY-MM-DD
  isbn: string,
  featured: boolean,
  coverImage: string
): Book {
  coverImage = coverImage
    ? bookCover(coverImage)
    : "https://placehold.co/300x450.png";

  return {
    id,
    title,
    author,
    description,
    coverImage,
    aiHint: coverImagePlaceholderKeywords,
    price,
    category,
    pages,
    publishedDate,
    isbn,
    featured: featured ?? false,
  };
}

function bookCover(fileName: string): string {
  return `images/book-covers/${fileName}`;
}

export const allBooks: Book[] = [
  bookRecord(
    "the-great-gatsby",
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    "A story of wealth, love, and tragedy in the Jazz Age.",
    "classic literature",
    12.99,
    "Classic",
    180,
    "1925-04-10",
    "9780743273565",
    true,
    "the-great-gatsby.jpg"
  ),
  bookRecord(
    "to-kill-a-mockingbird",
    "To Kill a Mockingbird",
    "Harper Lee",
    "A powerful story addressing racial injustice in the American South.",
    "legal drama",
    10.5,
    "Classic",
    281,
    "1960-07-11",
    "9780061120084",
    false,
    "to-kill-a-mockingbird.jpg"
  ),
  bookRecord(
    "1984",
    "1984",
    "George Orwell",
    "A dystopian novel set in a totalitarian society.",
    "dystopian future",
    9.99,
    "Sci-Fi",
    328,
    "1949-06-08",
    "9780451524935",
    true,
    "1984.jpeg"
  ),
  bookRecord(
    "pride-and-prejudice",
    "Pride and Prejudice",
    "Jane Austen",
    "A witty romance novel exploring societal norms in 19th-century England.",
    "romance classic",
    8.75,
    "Romance",
    279,
    "1813-01-28",
    "9780141439518",
    false,
    "pride-and-prejudice.jpeg"
  ),
  bookRecord(
    "the-hobbit",
    "The Hobbit",
    "J.R.R. Tolkien",
    "An adventure of Bilbo Baggins in Middle-earth.",
    "fantasy adventure",
    14.0,
    "Fantasy",
    310,
    "1937-09-21",
    "9780547928227",
    false,
    "the-hobbit.jpg"
  ),
  bookRecord(
    "fahrenheit-451",
    "Fahrenheit 451",
    "Ray Bradbury",
    "A novel about a future where books are banned and burned.",
    "dystopian books",
    11.25,
    "Sci-Fi",
    158,
    "1953-10-19",
    "9781451673319",
    false,
    "fahrenheit-451.jpg"
  ),
  bookRecord(
    "moby-dick",
    "Moby Dick",
    "Herman Melville",
    "The obsessive quest of Ahab, captain of the whaler Pequod, for revenge on Moby Dick.",
    "sea adventure",
    13.5,
    "Adventure",
    635,
    "1851-10-18",
    "9780142437247",
    false,
    "moby-dick.jpg"
  ),
  bookRecord(
    "jane-eyre",
    "Jane Eyre",
    "Charlotte Brontë",
    "The story of a young orphan who becomes a governess and finds love.",
    "gothic romance",
    9.2,
    "Romance",
    500,
    "1847-10-16",
    "9780141441146",
    false,
    "jane-eyre.jpg"
  ),
  bookRecord(
    "the-catcher-in-the-rye",
    "The Catcher in the Rye",
    "J.D. Salinger",
    "A story about teenage angst and alienation.",
    "coming of age",
    10.99,
    "Fiction",
    224,
    "1951-07-16",
    "9780316769488",
    false,
    "the-catcher-in-the-rye.jpeg"
  ),
  bookRecord(
    "animal-farm",
    "Animal Farm",
    "George Orwell",
    "An allegorical novella reflecting events leading up to the Russian Revolution.",
    "political satire",
    7.99,
    "Classic",
    112,
    "1945-08-17",
    "9780451526342",
    false,
    "animal-farm.jpeg"
  ),
  bookRecord(
    "war-and-peace",
    "War and Peace",
    "Leo Tolstoy",
    "A historical novel chronicling the French invasion of Russia.",
    "historical epic",
    18.99,
    "Historical Fiction",
    1225,
    "1869-01-01",
    "9780199232765",
    false,
    "war-and-peace.jpg"
  ),
  bookRecord(
    "the-lord-of-the-rings",
    "The Lord of the Rings",
    "J.R.R. Tolkien",
    "An epic high-fantasy novel.",
    "epic fantasy",
    25.0,
    "Fantasy",
    1178,
    "1954-07-29",
    "9780618640157",
    true,
    "the-lord-of-the-rings.jpg"
  ),
  bookRecord(
    "crime-and-punishment",
    "Crime and Punishment",
    "Fyodor Dostoevsky",
    "A psychological novel exploring the moral dilemmas of a destitute student.",
    "psychological fiction",
    11.8,
    "Classic",
    430,
    "1866-01-01",
    "9780486415871",
    false,
    "crime-and-punishment.png"
  ),
  bookRecord(
    "wuthering-heights",
    "Wuthering Heights",
    "Emily Brontë",
    "A tale of passionate and destructive love on the Yorkshire moors.",
    "gothic fiction",
    9.5,
    "Classic",
    416,
    "1847-12-01",
    "9780141439556",
    false,
    "wuthering-heights.jpg"
  ),
  bookRecord(
    "brave-new-world",
    "Brave New World",
    "Aldous Huxley",
    "A dystopian novel about a genetically engineered future society.",
    "sci-fi utopia",
    12.3,
    "Sci-Fi",
    311,
    "1932-01-01",
    "9780060850524",
    false,
    "brave-new-world.jpg"
  ),
  bookRecord(
    "the-odyssey",
    "The Odyssey",
    "Homer",
    "An epic poem about Odysseus's journey home after the Trojan War.",
    "epic poetry",
    10.0,
    "Mythology",
    541,
    "-800-01-01",
    "9780140268867",
    false,
    "the-odyssey.jpg"
  ),
  bookRecord(
    "sapiens-a-brief-history-of-humankind",
    "Sapiens: A Brief History of Humankind",
    "Yuval Noah Harari",
    "An exploration of human history from the Stone Age to the present day.",
    "history science",
    16.5,
    "Non-Fiction",
    464,
    "2011-01-01",
    "9780062316097",
    true,
    "sapiens-a-brief-history-of-humankind.jpg"
  ),
  bookRecord(
    "the-martian",
    "The Martian",
    "Andy Weir",
    "An astronaut's struggle for survival on Mars.",
    "space survival",
    13.75,
    "Sci-Fi",
    369,
    "2011-09-27",
    "9780804139021",
    false,
    "the-martian.jpg"
  ),
  bookRecord(
    "silent-spring",
    "Silent Spring",
    "Rachel Carson",
    "A book documenting the adverse environmental effects caused by the indiscriminate use of pesticides.",
    "environment nature",
    14.2,
    "Non-Fiction",
    368,
    "1962-09-27",
    "9780618249060",
    false,
    "silent-spring.jpg"
  ),
  bookRecord(
    "dune",
    "Dune",
    "Frank Herbert",
    "A landmark science fiction novel set in the distant future amidst a feudal interstellar society.",
    "desert planet",
    15.99,
    "Sci-Fi",
    412,
    "1965-08-01",
    "9780441172719",
    true,
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
