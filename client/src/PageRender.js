import React from 'react'
import { useParams } from 'react-router-dom'
import NotFound from './components/NotFound'

const generatePage = pageName => {
	const component = () => require(`./pages/${pageName.trim().replace(/^\w/, (c) => c.toUpperCase())}`).default
	try {
		return React.createElement(component())
	} catch (err) {
		console.log(err)
		return <NotFound />
	}
}

const PageRender = () => {
	const { page, id } = useParams()
	console.log(useParams())
	let pageName = "";
	if (id) {
		pageName = `${page}/[id]`
	} else {
		pageName = `${page}`
	}
	console.log(pageName)

	return generatePage(pageName)
}

export default PageRender