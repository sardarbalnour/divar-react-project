import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { getCategory } from "../../services/admin";
import { getCookie } from "../../utils/cookie";

import styles from "./AddPost.module.css";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const changeHandler = (event) => {
    if (event.target.name !== "image") {
      setForm({ ...form, [event.target.name]: event.target.value });
    } else {
      setForm({ ...form, [event.target.name]: event.target.files[0] });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }

    const token = getCookie("accessToken");

    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      // eslint-disable-next-line no-unused-vars
      .catch((err) => toast.error("مشکلی پیش آمده است !"));

    console.log(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      onChange={changeHandler}
      className={styles.form}
    >
      <h3>افزودن آگهی</h3>

      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />

      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />

      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />

      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />

      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" />

      <button type="submit">ایجاد</button>
    </form>
  );
}

export default AddPost;
