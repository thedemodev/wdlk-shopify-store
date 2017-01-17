import request from 'request';
import {config} from './config';
import {writeFile} from 'fs';
import {resolve} from 'path';

export default function instagramAuth (req) {
	let buildFile = resolve('./tasks/instagram/access.json');
	let authURL = `https://api.instagram.com/oauth/authorize/?client_id=${config.clientId}&redirect_uri=${config.callbackURL}&status=public_content&response_type=code`;

	//-- Get Instagram Access Token
	const handleAccessToken = cb => {
		const accessData = {};
		request.post(
			{
				form: {
					client_id: config.clientId,
					client_secret: config.clientSecret,
					grant_type: 'authorization_code',
					redirect_uri: config.callbackURL,
					code: config.code
				},
				url: 'https://api.instagram.com/oauth/access_token'
			},
			(err, response, body) => {
				if (err) {
					console.log(`Can not authenticate the Instagram token: ${err}`)
				}

				let data = JSON.parse(body);

				console.log(data);
				accessData.id = data['user']['id'];
				accessData.token = data['access_token'];

				cb(JSON.stringify(accessData));
			}
		);

	};

	handleAccessToken(data => {
		writeFile(buildFile, data, err => {
			if (err) {
				console.log(`Can not write JSON file: ${err}`);
				return;
			}

			console.log('Tokens were successfully generated');
		})
	})

}

instagramAuth();

