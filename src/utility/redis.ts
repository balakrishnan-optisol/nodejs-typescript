import { createClient } from 'redis';

class Redis {

	public client;
	constructor() {
		this.client = createClient();
		this.client.on('error', (err) => console.log('Redis Client Error', err));
	}

	async options() {
		try {

			const [setKeyReply, otherKeyValue] = await this.client
				.multi()
				.set('key', 'value')
				.get('key')
				.exec(); // ['OK', 'another-value']

			console.log('setKeyReply - ', setKeyReply);

			return otherKeyValue;
		} catch (error) {
			console.log('options error - ', error);
		}
	}

	async stringOptions() {
		try {
			let isGetString = await this.client.get("test_string");
			console.log('isGetString - ', isGetString);

			let iSsetString = await this.client.set("test_string", "Hello");
			console.log('iSsetString - ', iSsetString);

			const isTestStringExists = await this.client.exists("test_string");
			console.log('isTestStringExists - ', isTestStringExists);

			const isAppendString = await this.client.append("test_string", "world");
			console.log('isAppendString - ', isAppendString);

			isGetString = await this.client.get("test_string");
			console.log('isGetString - ', isGetString);

			const isGetRangeString = await this.client.getRange("test_string", 0, 4);
			console.log('isGetRangeString - ', isGetRangeString);

			const isSetRangeString = await this.client.setRange("test_string", 5, "Redis");

			const isSetBitString = await this.client.setBit("test_string", 5, 1);

			// const isGetBitString = await this.client.getBit("test_string", 5);
			// console.log('isGetBitString - ', isGetBitString);

			const isGetLenString = await this.client.strLen("test_string");
			console.log('isGetLenString - ', isGetLenString);

			const isDelString = await this.client.del("test_string");
			console.log('isDelString - ', isDelString);
			iSsetString = await this.client.set("test_string", "Hello");

			const isTypeString = await this.client.type("test_string");
			console.log('isTypeString - ', isTypeString);

			const isExpireString = await this.client.expire("test_string", 1000);
			console.log('isExpireString - ', isExpireString);

			isGetString = await this.client.get("test_string");
			console.log('isGetString - ', isGetString);

			return isSetRangeString;
		} catch (error) {
			console.log('stringOptions error - ', error);
		}
	}

	async listOption() {
		try {
			let list = await this.client.lRange("list", 0, -1);
			console.log('list - ', list);

			let lpush = await this.client.lPush("list", "A");

			const rpush = await this.client.rPush("list", "B");

			lpush = await this.client.lPush("list", "First");

			lpush = await this.client.lPush("list", ["First", "second", "third"]);

			const rpop = await this.client.rPop("list");
			console.log('rpop - ', rpop);

			const lpop = await this.client.lPop("list");
			console.log('lpop - ', lpop);

			const ltrim = await this.client.lTrim("list", 0, 2);
			console.log('ltrim - ', ltrim);

			const llen = await this.client.lLen("list");
			console.log('llen - ', llen);

			list = await this.client.lRange("list", 0, -1);
			console.log('ltrimmlist - ', list);

			return list;
		} catch (error) {
			console.log('listOption error - ', error);
		}
	}

	async hashSetsOption() {
		try {
			let list = await this.client.hGetAll("hash:10");
			console.log('hash - ', list);

			const hmset = await this.client.hSet("hash:10", { name: "Test", email: "test@gmail.com" });

			const hget = await this.client.hGet("hash:10", "name");
			console.log('hget - ', hget);

			list = await this.client.hGetAll("hash:10");
			console.log('hash - ', list);


			const sets = await this.client.sAdd("sets", ["1", "2", "3"]);

			let setList = await this.client.sMembers("sets");
			console.log('setList - ', setList);

			let checkSets = await this.client.sIsMember("sets", "3");
			console.log('checkSets - ', checkSets);

			checkSets = await this.client.sIsMember("sets", "13");
			console.log('checkSets - ', checkSets);

			const setPop = await this.client.sPop("sets");
			console.log('setPop - ', setPop);

			const setRandom = await this.client.sRandMember("sets");
			console.log('setRandom - ', setRandom);

			const setCard = await this.client.sCard("sets");
			console.log('setCard - ', setCard);

			setList = await this.client.sMembers("sets");
			console.log('setList - ', setList);

			return setList;
		} catch (error) {
			console.log('hashSetsOption error - ', error);
		}
	}

	async sortSetsOption() {
		try {
			let list = await this.client.zRange("hackers", 0, -1);
			console.log('sort set - ', list);

			let zadd = await this.client.zAdd("hackers", { score: 2, value: "Bala" });
			console.log('sort set zadd- ', zadd);

			zadd = await this.client.zAdd("hackers", { score: 5, value: "Test2" });
			zadd = await this.client.zAdd("hackers", { score: 8, value: "Test3" });
			zadd = await this.client.zAdd("hackers", { score: 100, value: "Test4" });
			console.log('sort set zadd- ', zadd);

			list = await this.client.zRange("hackers", 0, -1, { REV: true });
			console.log('sort set - ', list);

			// list = await this.client.xRevRange("hackers", 0, -1);
			// console.log('sort set - ', list);

			return list;
		} catch (error) {
			console.log('sortSetsOption error - ', error);
		}
	}

	async transactionOption() {
		try {
			console.log('tran');
			
		} catch (error) {
			console.log('transactionOption error - ', error);
		}
	}
}

export = new Redis();
