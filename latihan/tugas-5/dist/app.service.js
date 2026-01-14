"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AppService = class AppService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getHello() {
        return await 'Hello World!';
    }
    async checkDatabaseConnection() {
        try {
            const result = await this.dataSource.query('SELECT 1 + 1 AS sum');
            console.log('Hasil Query:', result);
            return {
                status: 'yeay!',
                message: 'Koneksi Database Berhasil!',
                data: result,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                status: 'Error',
                message: 'Gagal konek ke database',
                error: errorMessage,
            };
        }
    }
    async getAllUsers() {
        const query = `SELECT id, name, address, age, jobs, created_at FROM users`;
        const rawData = await this.dataSource.query(query);
        const users = rawData.map((raw) => {
            const user = {};
            user.id = raw.id;
            user.name = raw.name;
            user.address = raw.address;
            user.age = raw.age;
            user.jobs = raw.jobs;
            user.created_at = raw.created_at;
            return user;
        });
        return users;
    }
    async getUserById(id) {
        const query = `SELECT id, name, address, age, jobs, created_at FROM users WHERE id = ?`;
        const rawData = await this.dataSource.query(query, [id]);
        const users = rawData.map((raw) => {
            const user = {};
            user.id = raw.id;
            user.name = raw.name;
            user.address = raw.address;
            user.age = raw.age;
            user.jobs = raw.jobs;
            user.created_at = raw.created_at;
            return user;
        });
        return users;
    }
    async addUser(payload) {
        try {
            const query = `INSERT INTO users (name, address, age, jobs) VALUES (?, ?, ?, ?);`;
            const rawData = await this.dataSource.query(query, [
                payload.name,
                payload.address,
                payload.age,
                payload.jobs,
            ]);
            console.log('Sukses: ', rawData);
            return {
                message: 'berhasil',
                data: payload,
            };
        }
        catch (error) {
            console.error('Database Error Detail:', error);
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'gagal tambah user');
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppService);
//# sourceMappingURL=app.service.js.map