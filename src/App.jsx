import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPages from "./components/admin/AdminPages";
import AlumniPage from "./components/admin/components/AlumniPage";
import AniPage from "./components/admin/components/AniPage";
import AppsPage from "./components/admin/components/AppsPage";
import BlogPage from "./components/admin/components/BlogPage";
import Index from "./components/admin/components/Index";
import PremiiPage from "./components/admin/components/PremiiPage";
import ShopPage from "./components/admin/components/ShopPage";
import SponsorsPage from "./components/admin/components/SponsorsPage";
import Alumni from "./components/alumni/Alumni";
import Apps from "./components/apps/Apps";
import Blog from "./components/blog/Blog";
import BlogPost from "./components/blog/BlogPost";
import Despre from "./components/despre/Despre";
import Home from "./components/home/Home";
import NotFound from "./components/notfound/NotFound";
import Cart from "./components/shop/Cart";
import ProductPage from "./components/shop/ProductPage";
import Shop from "./components/shop/Shop";
import Sponsors from "./components/sponsors/Sponsors";
import Firestore from "./components/utils/Firestore";
import Footer from "./components/utils/Footer";
import Navbar from "./components/utils/Navbar";
import Users from "./components/admin/components/Users";
import BlogPagePost from "./components/admin/components/BlogPagePost";
import Crm from "./components/admin/components/Crm";
import CreateRoom from "./components/admin/components/Meet/CreateRoom";
import EndMeet from "./components/admin/components/Meet/EndMeet";
import Room from "./components/admin/components/Meet/Room";
import Errors from "./components/admin/components/Meet/Errors";

// const firestore = new Firestore();

function App() {
  //   const [user, loading, error] = useAuthState(firestore.getuser());

  //   const [blog, setBlog] = useState([]);
  //   const getBlog = useMemo(() => async () => {
  //     await firestore.sortdata("blog", "createAt", "desc").then((res) => {
  //       setBlog(res);
  //     });
  //   });

  //   const addit = useMemo(() => async (id, cant) => {
  //     await firestore.addit(id, user, cant);
  //   });
  //   const delete_prod_app = useMemo(() => async (id, cant) => {
  //     await firestore.deleteDocument("cos", id).then((res) => {
  //       alert("Produs scos din cosul tau!");
  //     });
  //   });
  //   const update = useMemo(() => async (cant, uid) => {
  //     await firestore
  //       .updateDocument("cos", uid, { cantitate: cant })
  //       .then((res) => {
  //         alert("cantitatea s-a updatat!");
  //       });
  //   });
  //   const finish = useMemo(() => async () => {
  //     return await firestore
  //       .delete_all_from_cart_by_user_id(user.uid)
  //       .then((res) => {
  //         //
  //       });
  //   });
  //   const fixCant = useMemo(() => async (hidden) => {
  //     //
  //     hidden.forEach(async (element) => {
  //       await firestore.getProductById(element.id).then(async (res) => {
  //         //
  //         await firestore
  //           .updateDocument("products", res.id, {
  //             cantitate: res.cantitate - element.cant,
  //           })
  //           .then((ress) => {
  //             //
  //           });
  //       });
  //     });
  //     return true;
  //   });
  //   const [apps, setApps] = useState([]);
  //   const getApps = useMemo(() => async () => {
  //     await firestore.sortdata("apps", "createAt", "desc").then((res) => {
  //       setApps(res);
  //     });
  //   });
  //   const [ani, setAni] = useState([]);
  //   const [alumni, setAlumni] = useState([]);

  //   const getAni = useMemo(() => async () => {
  //     await firestore.sortdata("ani", "createAt", "desc").then(async (res) => {
  //       setAni(res);
  //       await firestore.readDocuments("team_member").then((res) => {
  //         setAlumni(res);
  //       });
  //     });
  //   });
  //   const [spon, setSpon] = useState([]);
  //   const getSpon = useMemo(() => async () => {
  //     await firestore.readDocuments("sponsors").then((res) => {
  //       setSpon(res);
  //     }).catch(er=>{
  //       console.log(er);
  //     });
  //   });
  //   const [premii, setPremii] = useState([]);
  //   const getPremii = useMemo(() => async () => {
  //     await firestore.sortdata("premii", "an", "asc").then((res) => {
  //       setPremii(res);
  //     });
  //   });

  //   const [users, setUsers] = useState([]);

  //   const getUsers = useMemo(() => async () => {
  //     await firestore.readDocuments("thobor_users").then((res) => {
  //       setUsers(res);
  //     });
  //   });
  //   const [tasks, setTasks] = useState([]);

  //   const getTasks = useMemo(() => async () => {
  //     await firestore.readDocuments("tasks").then((res) => {
  //       setTasks(res);
  //     });
  //   });
  //   const [isAllowed, setIsAllowed] = useState(false);
  //   const [role, setRole] = useState("");

  //   const decide = useMemo(() => async () => {
  //     if (user && !loading)
  //       await firestore
  //         .readDocuments("thobor_users", ["email", "==", user.email])
  //         .then(async (res) => {
  //           setRole(res[0].role);
  //           if (!["ldd", "alumni", "mentor", "admin"].includes(res[0].role)) {
  //             setIsAllowed(false);
  //           } else {
  //             setIsAllowed(true);
  //           }
  //         });
  //   });

  //   useEffect(() => {
  //     getAni();
  //     getBlog();
  //     getApps();
  //     getSpon();
  //     getPremii();
  //     getUsers();
  //     getTasks();
  //   }, []);

  //   useEffect(() => {
  //     decide();
  //   }, [, loading, user]);

  //   const [link, setLink] = useState("");
  //   useEffect(() => {
  //     setLink(window.location.pathname);
  //   }, [window.location]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/team" element={<Alumni />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
