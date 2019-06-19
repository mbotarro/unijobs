package dal_test

import (
	"testing"
	"time"

	"gotest.tools/assert"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
)

func getUserDAL(db *sqlx.DB) *dal.UserDAL {
	return dal.NewUserDAL(db)
}

func TestAuthenticateInvalidUser(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	userDAL := getUserDAL(db)

	// We should authenticate a valid user
	valid, id, err := userDAL.AuthenticateUser("falseuser@falseprovider.com", "false_password")
	assert.Equal(t, nil, err)
	assert.Equal(t, false, valid)
	assert.Equal(t, -1, id)
}

func TestAuthenticateValidUser(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	userDAL := getUserDAL(db)

	// We should not authenticate a valid user
	name := "user"
	email := "user@user.com"
	pass := "1234"
	tel := "9999-1111"

	u := tools.CreateFakeUser(t, db, name, email, pass, tel)

	valid, id, err := userDAL.AuthenticateUser(email, pass)
	assert.Equal(t, nil, err)
	assert.Equal(t, true, valid)
	assert.Equal(t, u.Userid, id)
}

func TestGetUserInfo(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	userDAL := getUserDAL(db)

	u := tools.CreateFakeUser(t, db, "user", "user@userland.com", "1234", "9999-1111")

	gotU, err := userDAL.GetUserInfo(u.Userid)
	assert.Equal(t, nil, err)
	assert.Equal(t, u, gotU)

}

func TestGetUserRequests(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u1 := tools.CreateFakeUser(t, db, "user1", "user1@user.com", "1234", "9999-1111")
	u2 := tools.CreateFakeUser(t, db, "user2", "user2@user.com", "1234", "9999-2222")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Física", "Física")

	reqs1 := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u1.Userid, c1.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
	}

	reqs2 := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Física I", "", u2.Userid, c2.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Física II", "", u2.Userid, c2.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Física III", "", u2.Userid, c2.ID, time.Now().Add(-23*time.Hour)),
	}

	userDAL := getUserDAL(db)

	t.Run("Get User 1 Requests", func(t *testing.T) {
		gotReqs, err := userDAL.GetUserRequests(u1.Userid, time.Now(), 10)
		assert.Equal(t, nil, err)

		assert.Equal(t, reqs1[1], gotReqs[0])
		assert.Equal(t, reqs1[0], gotReqs[1])
	})

	t.Run("Get User 2 Requests", func(t *testing.T) {
		gotReqs, err := userDAL.GetUserRequests(u2.Userid, time.Now(), 10)
		assert.Equal(t, nil, err)

		assert.Equal(t, reqs2[2], gotReqs[0])
		assert.Equal(t, reqs2[1], gotReqs[1])
		assert.Equal(t, reqs2[0], gotReqs[2])
	})
}

func TestGetUserOffers(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u1 := tools.CreateFakeUser(t, db, "user1", "user1@user.com", "1234", "9999-1111")
	u2 := tools.CreateFakeUser(t, db, "user2", "user2@user.com", "1234", "9999-2222")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Física", "Física")

	offers1 := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Cálculo I", "", u1.Userid, c1.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo II", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
	}

	offers2 := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Física I", "", u2.Userid, c2.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Física II", "", u2.Userid, c2.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Física III", "", u2.Userid, c2.ID, time.Now().Add(-23*time.Hour)),
	}

	userDAL := getUserDAL(db)

	t.Run("Get User 1 Offers", func(t *testing.T) {
		gotOffers, err := userDAL.GetUserOffers(u1.Userid, time.Now(), 10)
		assert.Equal(t, nil, err)

		assert.Equal(t, offers1[1], gotOffers[0])
		assert.Equal(t, offers1[0], gotOffers[1])
	})

	t.Run("Get User 2 Offers", func(t *testing.T) {
		gotOffers, err := userDAL.GetUserOffers(u2.Userid, time.Now(), 10)
		assert.Equal(t, nil, err)

		assert.Equal(t, offers2[2], gotOffers[0])
		assert.Equal(t, offers2[1], gotOffers[1])
		assert.Equal(t, offers2[0], gotOffers[2])
	})
}

func TestGetUserRequestsWithPagination(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u1 := tools.CreateFakeUser(t, db, "user1", "user1@user.com", "1234", "9999-1111")
	u2 := tools.CreateFakeUser(t, db, "user2", "user2@user.com", "1234", "9999-2222")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Física", "Física")

	reqs1 := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u1.Userid, c1.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo IV", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
	}

	tools.CreateFakeRequest(t, db, "Aula Física I", "", u2.Userid, c2.ID, time.Now().Add(-25*time.Hour))
	tools.CreateFakeRequest(t, db, "Aula Física II", "", u2.Userid, c2.ID, time.Now().Add(-24*time.Hour))

	userDAL := getUserDAL(db)

	t.Run("with page size 2", func(t *testing.T) {
		pagesize := 2

		// First query should return just 2 requests
		gotReqs, err := userDAL.GetUserRequests(u1.Userid, time.Now(), pagesize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 2, len(gotReqs))
		assert.Equal(t, reqs1[3], gotReqs[0])
		assert.Equal(t, reqs1[2], gotReqs[1])

		// We want to get the last 2 requests that were created before the last request returned by the first query
		gotReqs, err = userDAL.GetUserRequests(u1.Userid, gotReqs[1].Timestamp, pagesize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 2, len(gotReqs))
		assert.Equal(t, reqs1[1], gotReqs[0])
		assert.Equal(t, reqs1[0], gotReqs[1])
	})

	t.Run("with page size 3", func(t *testing.T) {
		pageSize := 3

		// First query should return just 3 requests
		gotReqs, err := userDAL.GetUserRequests(u1.Userid, time.Now(), pageSize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 3, len(gotReqs))
		assert.Equal(t, reqs1[3], gotReqs[0])
		assert.Equal(t, reqs1[2], gotReqs[1])
		assert.Equal(t, reqs1[1], gotReqs[2])

		// We want to get the request that was created before the last request returned by the first query
		gotReqs, err = userDAL.GetUserRequests(u1.Userid, gotReqs[2].Timestamp, pageSize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 1, len(gotReqs))
		assert.Equal(t, reqs1[0], gotReqs[0])
	})
}

func TestGetUserOffersWithPagination(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u1 := tools.CreateFakeUser(t, db, "user1", "user1@user.com", "1234", "9999-1111")
	u2 := tools.CreateFakeUser(t, db, "user2", "user2@user.com", "1234", "9999-2222")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Física", "Física")

	offers1 := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Cálculo I", "", u1.Userid, c1.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo II", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo III", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo IV", "", u1.Userid, c1.ID, time.Now().Add(-24*time.Hour)),
	}

	tools.CreateFakeOffer(t, db, "Aula Física I", "", u2.Userid, c2.ID, time.Now().Add(-25*time.Hour))
	tools.CreateFakeOffer(t, db, "Aula Física II", "", u2.Userid, c2.ID, time.Now().Add(-24*time.Hour))

	userDAL := getUserDAL(db)

	t.Run("with page size 2", func(t *testing.T) {
		pagesize := 2

		// First query should return just 2 offers
		gotOffers, err := userDAL.GetUserOffers(u1.Userid, time.Now(), pagesize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 2, len(gotOffers))
		assert.Equal(t, offers1[3], gotOffers[0])
		assert.Equal(t, offers1[2], gotOffers[1])

		// We want to get the last 2 offers that were created before the last offer returned by the first query
		gotOffers, err = userDAL.GetUserOffers(u1.Userid, gotOffers[1].Timestamp, pagesize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 2, len(gotOffers))
		assert.Equal(t, offers1[1], gotOffers[0])
		assert.Equal(t, offers1[0], gotOffers[1])
	})

	t.Run("with page size 3", func(t *testing.T) {
		pageSize := 3

		// First query should return just 3 offers
		gotOffers, err := userDAL.GetUserOffers(u1.Userid, time.Now(), pageSize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 3, len(gotOffers))
		assert.Equal(t, offers1[3], gotOffers[0])
		assert.Equal(t, offers1[2], gotOffers[1])
		assert.Equal(t, offers1[1], gotOffers[2])

		// We want to get the offer that was created before the last offer returned by the first query
		gotOffers, err = userDAL.GetUserOffers(u1.Userid, gotOffers[2].Timestamp, pageSize)
		assert.Equal(t, nil, err)

		assert.Equal(t, 1, len(gotOffers))
		assert.Equal(t, offers1[0], gotOffers[0])
	})
}
