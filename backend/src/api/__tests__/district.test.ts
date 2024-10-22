import supertest from 'supertest'
import { app } from '../../server'
import { OK } from '../constants/http'


describe('District Routes', () => {

      it('Get Health', async () => {
            const res = await supertest(app).get('/api/district/health')

            expect(res.status).toBe(OK)
      })
})