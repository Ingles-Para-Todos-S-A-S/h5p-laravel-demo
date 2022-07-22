import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
//import { Editor } from "@escolalms/h5p-react";
import { editorSettings, updateContent } from "../services";
import { Editor } from "../components/h5p/editor";
import { EditorSettings, H5PEditorContent } from "@escolalms/h5p-react";

export const page = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [settings, setEditorSettings] = useState<EditorSettings>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            editorSettings(
                id === "new" ? undefined : id,
                localStorage.getItem("lang") || "en"
            )
                .then((res) => res.json())
                .then((data) => {
                    setEditorSettings(data.data);
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = useCallback((data: H5PEditorContent) => {
        setLoading(true);
        updateContent(data, id === "new" ? undefined : id)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setLoading(false);
                    navigate(`/editor/${data.data.id}`);
                }
            });
    }, []);

    if (!settings) {
        return <p>loading...</p>;
    }

    return (
        settings && (
            <Editor
                onError={(err) => console.error(err)}
                state={settings}
                allowSameOrigin
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    );
};

export default page;
