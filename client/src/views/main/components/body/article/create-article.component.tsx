import React, { useState } from "react";
import { CREATE_ARTICLE } from "models/mutations/mutations";
import { useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";

function CreateArticleForm() {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [date, setDate] = useState("");
	const [text, setText] = useState("");

	const [createArticle, { error }] = useMutation(CREATE_ARTICLE);

	const addArticle = () => {
		createArticle({
			variables: {
				// TODO: get from Redux state
				author: "Sean Hinds",
				title: title,
				subtitle: subtitle,
				date: new Date().toDateString(),
				text: text
			}
		});

		if (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Title</Form.Label>
					<Form.Control 
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						type="text" 
						placeholder="Enter Title" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Subtitle</Form.Label>
					<Form.Control 
						onChange={(e) => {
							setSubtitle(e.target.value);
						}}
						type="text" 
						placeholder="Enter Subtitle" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Text</Form.Label>
					<Form.Control 
						onChange={(e) => {
							setText(e.target.value);
						}}
						type="text" 
						placeholder="Enter Text" />
				</Form.Group>
				<Button 
					variant="primary" 
					type="submit"
					onClick={addArticle}>
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default CreateArticleForm;