import React from 'react'
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon
} from 'react-share'

const ShareModal = ({ url, theme }) => {
    return (
        <div style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} className="px-4 py-2 d-flex justify-content-between bg-light">
            <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>
            <EmailShareButton url={url}>
                <EmailIcon round={true} size={32} />
            </EmailShareButton>
            <RedditShareButton url={url}>
                <RedditIcon round={true} size={32} />
            </RedditShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={32} />
            </TelegramShareButton>
            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>
        </div>
    )
}

export default ShareModal
