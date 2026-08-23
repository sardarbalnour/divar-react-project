import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { addCategory } from "../../services/admin";

import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const [showMessage, setShowMessage] = useState(false);

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: addCategory,
  });
  console.log({ isPending, error, data });

  useEffect(() => {
    if (!error && !data) return;

    setShowMessage(true);
    const timer = setTimeout(() => setShowMessage(false), 3000);

    return () => clearTimeout(timer);
  }, [error, data]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;

    mutate(form);

    // console.log(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {showMessage && error && <p>{error.message}</p>}
      {isPending && <p>در حال ارسال...</p>}
      {showMessage && data && <p>دسته بندی با موفقیت ایجاد شد.</p>}

      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />

      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />

      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
