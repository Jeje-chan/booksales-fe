import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public";
import Books from "./pages/public/books";
import PublicLayout from "./layouts/public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import GenreCreate from "./pages/admin/genres/create";
import GenreList from "./pages/admin/genres";
import AuthorList from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create"; // ⬅ pastikan ini ada
import BookEdit from "./pages/admin/books/edit";
import GenreEdit from "./pages/admin/genres/edit";
import AuthorEdit from "./pages/admin/authors/edit";
import ShowBook from "./pages/public/books/show";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="books">
                        <Route index element={<Books />} />
                        <Route path="show/:id" element={<ShowBook />} /> {/* Book details page */}
                    </Route>
                </Route>

                {/* Auth */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Admin */}
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    
                    <Route path="books">
                        <Route index element={<AdminBooks />} />
                        <Route path="create" element={<BookCreate />} />
                        <Route path="edit/:id" element={<BookEdit />} />
                    </Route>

                    <Route path="genres">
                        <Route index element={<GenreList />} />
                        <Route path="create" element={<GenreCreate />} />
                        <Route path="edit/:id" element={<GenreEdit />} /> {/* Reuse GenreCreate for edit */}
                    </Route>

                    <Route path="authors">
                        <Route index element={<AuthorList />} />
                        <Route path="create" element={<AuthorCreate />} />
                        <Route path="edit/:id" element={<AuthorEdit />} /> {/* Reuse AuthorCreate for edit */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
