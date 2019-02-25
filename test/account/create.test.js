const chai = require('chai');
chai.use(require('chai-http'));
const expect = require('chai').expect;
const app = require('../../app');

const Account = require('../../models/account/Account');

describe('POST /account/create', () => {

	beforeEach(async () => {
		await Account.remove();
	});

	it('should add account to database', async() => {
		const data = {
			email: 'test@gmail.com',
			name: 'Testo',
			age: 56
		};
		let res = await chai.request(app).post('/account/create').send(data);
		expect(res).to.have.status(200);

		const account = await Account.findOne();
		expect(account).to.exist;
	});

});
