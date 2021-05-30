export const imageShow = (src, theme) => {
    return (
        <img
            className="img-thumbnail"
            src={src}
            alt="images"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        />
    )
}

export const videoShow = (src, theme) => {
    return (
        <video
            controls
            className="img-thumbnail"
            src={src}
            alt="images"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        />
    )
}