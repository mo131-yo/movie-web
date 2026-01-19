"use client";

    import { useEffect, useState } from "react";
    import { Trash2 } from "lucide-react";

    type Comment = {
    id: string;
    text: string;
    date: string;
    };

    type Props = {
    movieId: string;
    };

    const Comment = ({ movieId }: Props) => {
    const [text, setText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);

    /* 🔄 Load comments */
    useEffect(() => {
        const stored = localStorage.getItem(`comments-${movieId}`);
        if (stored) {
        setComments(JSON.parse(stored));
        }
    }, [movieId]);

    /* 💾 Save comments */
    const saveComments = (data: Comment[]) => {
        setComments(data);
        localStorage.setItem(`comments-${movieId}`, JSON.stringify(data));
    };

    /* ➕ Add comment */
    const addComment = () => {
        if (!text.trim()) return;

        const newComment: Comment = {
        id: crypto.randomUUID(),
        text,
        date: new Date().toLocaleDateString(),
        };

        saveComments([newComment, ...comments]);
        setText("");
    };

    /* ❌ Delete comment */
    const deleteComment = (id: string) => {
        const updated = comments.filter((c) => c.id !== id);
        saveComments(updated);
    };

    return (
        <div className="mt-10 max-w-xl">
        <h3 className="text-xl font-semibold mb-3">Comments</h3>

        {/* Input */}
        <div className="flex gap-2 mb-4">
            <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded px-3 py-2"
            />
            <button
            onClick={addComment}
            className="bg-black text-white px-4 rounded"
            >
            Post
            </button>
        </div>

        {/* Comment list */}
        <div className="space-y-3">
            {comments.length === 0 && (
            <p className="text-sm text-gray-500">No comments yet.</p>
            )}

    {comments.map((c) => (
    <div
        key={c.id}   // ⭐ ЗААВАЛ
        className="flex justify-between items-start border rounded p-3"
    >
        <div>
        <p className="text-sm">{c.text}</p>
        <p className="text-xs text-gray-400">{c.date}</p>
        </div>

        <button
        onClick={() => deleteComment(c.id)}
        className="text-red-500 hover:text-red-700"
        >
        🗑
        </button>
    </div>
    ))}

        </div>
        </div>
    );
    };

    export default Comment;
