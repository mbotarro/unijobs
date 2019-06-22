package dal_test

import (
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
	"gotest.tools/assert"
)

func getOfferDAL(db *sqlx.DB) *dal.OfferDAL {
	return dal.NewOfferDAL(db)
}

func TestGetLastOffers(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática Avancada", "Matemática")

	offers := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Cálculo 4", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 5", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 6", "", u.Userid, c.ID, time.Now()),
	}

	offerDAL := getOfferDAL(db)

	t.Run("without size limit", func(t *testing.T) {
		gotOffers, err := offerDAL.GetLastOffers(time.Now(), 30)
		assert.Equal(t, nil, err)

		assert.Equal(t, 3, len(gotOffers))
		assert.Equal(t, offers[2], gotOffers[0])
		assert.Equal(t, offers[1], gotOffers[1])
		assert.Equal(t, offers[0], gotOffers[2])
	})

	t.Run("with size limit", func(t *testing.T) {
		t.Run("size 2", func(t *testing.T) {
			gotOffers, err := offerDAL.GetLastOffers(time.Now(), 2)
			assert.Equal(t, nil, err)

			assert.Equal(t, 2, len(gotOffers))
			assert.Equal(t, offers[2], gotOffers[0])
			assert.Equal(t, offers[1], gotOffers[1])
		})

		t.Run("size 1", func(t *testing.T) {
			gotOffers, err := offerDAL.GetLastOffers(time.Now(), 1)
			assert.Equal(t, nil, err)

			assert.Equal(t, 1, len(gotOffers))
			assert.Equal(t, offers[2], gotOffers[0])
		})
	})
}

func TestGetLastOffersBeforeTimestamp(t *testing.T) {
	db := tools.GetTestDB()
	defer tools.CleanDB(db)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática Avancada", "Matemática")

	offers := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Cálculo 4", "", u.Userid, c.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 5", "", u.Userid, c.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Álgebra Linear 3", "", u.Userid, c.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 6", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 7", "", u.Userid, c.ID, time.Now()),
	}

	offerDAL := getOfferDAL(db)

	t.Run("without size limit", func(t *testing.T) {
		// Get only the offers created before 1 hour ago
		gotOffers, err := offerDAL.GetLastOffers(time.Now().Add(-time.Hour), 30)
		assert.Equal(t, nil, err)

		// We should get just the first two offers, ordered by creation time
		assert.Equal(t, 3, len(gotOffers))
		assert.Equal(t, offers[2], gotOffers[0])
		assert.Equal(t, offers[1], gotOffers[1])
		assert.Equal(t, offers[0], gotOffers[2])
	})

	t.Run("with size limit", func(t *testing.T) {
		t.Run("size 2", func(t *testing.T) {
			gotOffers, err := offerDAL.GetLastOffers(time.Now().Add(-time.Hour), 2)
			assert.Equal(t, nil, err)

			assert.Equal(t, 2, len(gotOffers))
			assert.Equal(t, offers[2], gotOffers[0])
			assert.Equal(t, offers[1], gotOffers[1])
		})

		t.Run("size 1", func(t *testing.T) {
			gotOffers, err := offerDAL.GetLastOffers(time.Now().Add(-time.Hour), 1)
			assert.Equal(t, nil, err)

			assert.Equal(t, 1, len(gotOffers))
			assert.Equal(t, offers[2], gotOffers[0])
		})
	})
}

func CompareOffers(off1, off2 models.Offer) bool {
	equalReqs := true

	equalReqs = equalReqs && (off1.Name == off2.Name)
	equalReqs = equalReqs && (off1.Description == off2.Description)
	equalReqs = equalReqs && (off1.ExtraInfo == off2.ExtraInfo)
	equalReqs = equalReqs && (off1.MaxPrice == off2.MaxPrice)
	equalReqs = equalReqs && (off1.MinPrice == off2.MinPrice)
	equalReqs = equalReqs && (off1.Userid == off2.Userid)
	equalReqs = equalReqs && (off1.Categoryid == off2.Categoryid)

	return equalReqs
}

func TestInsertOffer(t *testing.T) {
	// Get connection to test database and cleans it
	db := tools.GetTestDB()
	defer tools.CleanDB(db)
	offerDAL := getOfferDAL(db)

	// Create the fake offer
	var off models.Offer
	off.Name = "Requis Aula Calc"
	off.Description = "Procuro aula de calculo"
	off.ExtraInfo = "Informacao X"
	off.MinPrice = 20
	off.MaxPrice = 50
	off.Expiration = time.Now().Add(8760 * time.Hour)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	off.Userid = u.Userid
	off.Categoryid = c.ID

	// Executes the test query
	err := offerDAL.InsertOffer(off)

	// Checks the expected results
	assert.Equal(t, nil, err)

	// Checks if the offer was inserted successfully
	t.Run("size 1", func(t *testing.T) {
		gotReqs, err := offerDAL.GetLastOffers(time.Now().Add(-time.Hour), 1)
		assert.Equal(t, nil, err)

		equalReqs := CompareOffers(gotReqs[0], off)
		assert.Equal(t, equalReqs, true)
	})
}
