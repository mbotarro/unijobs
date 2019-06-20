package dal_test

import (
	"context"
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
	"github.com/olivere/elastic/v7"
	"gotest.tools/assert"
)

func getOfferDAL(db *sqlx.DB, es *elastic.Client) *dal.OfferDAL {
	return dal.NewOfferDAL(db, es)
}

func TestGetLastOffers(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática Avancada", "Matemática")

	offers := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Cálculo 4", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 5", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 6", "", u.Userid, c.ID, time.Now()),
	}

	offerDAL := getOfferDAL(db, es)

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
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática Avancada", "Matemática")

	offers := []models.Offer{
		tools.CreateFakeOffer(t, db, "Aula Cálculo 4", "", u.Userid, c.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 5", "", u.Userid, c.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Álgebra Linear 3", "", u.Userid, c.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 6", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeOffer(t, db, "Aula Cálculo 7", "", u.Userid, c.ID, time.Now()),
	}

	offerDAL := getOfferDAL(db, es)

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
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	offerDAL := getOfferDAL(db, es)

	// Create the fake offer
	var off models.Offer
	off.Name = "Requis Aula Calc"
	off.Description = "Procuro aula de calculo"
	off.ExtraInfo = "Informacao X"
	off.MinPrice = 20
	off.MaxPrice = 50

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	off.Userid = u.Userid
	off.Categoryid = c.ID

	// Executes the test query
	err := offerDAL.InsertOfferInDB(&off)

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

func TestInsertOfferInES(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	offerDAL := getOfferDAL(db, es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	// Create fake offer in db and insert the same offer in ES
	off := tools.CreateFakeOffer(t, db, "Aula de Cálculo I", "Dou aulas particulares de Cálculo I", u.Userid, c.ID, time.Now())

	// Executes the test query
	err := offerDAL.InsertOfferInES(off)

	// We expect no error in the insertion
	assert.Equal(t, nil, err)

	// Checks if the offer was inserted successfully
	t.Run("1 insertion", func(t *testing.T) {
		termQuery := elastic.NewTermQuery("db_id", off.ID)
		searchResult, err := es.Search().
			Index("offer").
			Query(termQuery).
			Do(context.Background())

		// We expect no error
		assert.Equal(t, nil, err)
		assert.Equal(t, 1, int(searchResult.TotalHits()))

		gotOffs, err := tools.GetOffersFromSearchResult(searchResult)
		assert.Equal(t, nil, err)
		assert.Equal(t, 1, len(gotOffs))
	})

	off2 := tools.CreateFakeOffer(t, db, "Algebra Linear", "Sou mestrando no ICMC", u.Userid, c.ID, time.Now())
	err = offerDAL.InsertOfferInES(off2)
	assert.Equal(t, nil, err)

	t.Run("2 insertions", func(t *testing.T) {
		termsQuery := elastic.NewTermsQuery("db_id", off.ID, off2.ID)
		searchResult, err := es.Search().
			Index("offer").
			Query(termsQuery).
			Do(context.Background())

		// We expect no error
		assert.Equal(t, nil, err)
		assert.Equal(t, 2, int(searchResult.TotalHits()))

		gotOffs, err := tools.GetOffersFromSearchResult(searchResult)
		assert.Equal(t, nil, err)
		assert.Equal(t, 2, len(gotOffs))
	})
}

func TestSearchOfferInES(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	offerDAL := getOfferDAL(db, es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Física", "Física")
	c3 := tools.CreateFakeCategory(t, db, "Aula Computação", "Ciência de Computação")
	c4 := tools.CreateFakeCategory(t, db, "Extracurricular", "Extracurricular")
	c5 := tools.CreateFakeCategory(t, db, "Serviços Gerais", "Serviços Gerais")

	off1 := tools.CreateFakeOffer(t, db, "Aula de Cálculo I", "Dou aula de cálculo I", u.Userid, c1.ID, time.Now().Add(-10*time.Hour))
	off2 := tools.CreateFakeOffer(t, db, "Aula de Cálculo II", "Ajudo em provas e listas", u.Userid, c1.ID, time.Now().Add(-9*time.Hour))
	off3 := tools.CreateFakeOffer(t, db, "Aula de Cálculo III", "Dou aula de cálculo III", u.Userid, c1.ID, time.Now().Add(-8*time.Hour))
	off4 := tools.CreateFakeOffer(t, db, "Álgebra Linear", "Sou mestrando em Matemática no ICMC", u.Userid, c1.ID, time.Now().Add(-7*time.Hour))
	off5 := tools.CreateFakeOffer(t, db, "Aula de ICC I", "Posso ajudar em provas e trabalhos", u.Userid, c3.ID, time.Now().Add(-6*time.Hour))
	off6 := tools.CreateFakeOffer(t, db, "Aula de ICC II", "Posso ajudar em todos os tópicos da matéria", u.Userid, c3.ID, time.Now().Add(-5*time.Hour))
	off7 := tools.CreateFakeOffer(t, db, "Aulas de Física", "Dou aula de Física I, II, III, e IV", u.Userid, c2.ID, time.Now().Add(-4*time.Hour))
	off8 := tools.CreateFakeOffer(t, db, "Aula de Piano", "Dou aula de piano para todos os níveis", u.Userid, c4.ID, time.Now().Add(-3*time.Hour))
	off9 := tools.CreateFakeOffer(t, db, "Pet Care", "Posso passear com seu cachorro!!", u.Userid, c5.ID, time.Now().Add(-2*time.Hour))
	off10 := tools.CreateFakeOffer(t, db, "Limpeza", "Ajudo na limpeza de casas e apartamentos", u.Userid, c5.ID, time.Now().Add(-time.Hour))

	for _, off := range []models.Offer{off1, off2, off3, off4, off5, off6, off7, off8, off9, off10} {
		err := offerDAL.InsertOfferInES(off)
		assert.Equal(t, nil, err)
	}

	t.Run("get offers in es without category", func(t *testing.T) {
		t.Run("get only one offer", func(t *testing.T) {
			ids, err := offerDAL.SearchInES("limpeza")

			// We expect to get documents that matches aula or calculo. A higher score is given to docs that matches both name and description
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, off10.ID, ids[0])
		})

		t.Run("get lot of offers", func(t *testing.T) {
			ids, err := offerDAL.SearchInES("aula calculo")

			// We expect to get documents that matches aula or calculo. A higher score is given to docs that matches both name and description
			assert.Equal(t, nil, err)
			assert.Equal(t, 7, len(ids))
			assert.Equal(t, off3.ID, ids[0])
			assert.Equal(t, off1.ID, ids[1])
			assert.Equal(t, off2.ID, ids[2])
			assert.Equal(t, off8.ID, ids[3])
			assert.Equal(t, off7.ID, ids[4])
			assert.Equal(t, off6.ID, ids[5])
			assert.Equal(t, off5.ID, ids[6])
		})

	})

	t.Run("get offers in es with categories", func(t *testing.T) {
		t.Run("only math offers", func(t *testing.T) {
			ids, err := offerDAL.SearchInES("aula calculo", c1.ID)

			// We expect get documents that matches aula or calculo but only belonging to the Math category
			assert.Equal(t, nil, err)
			assert.Equal(t, 3, len(ids))
			assert.Equal(t, off3.ID, ids[0])
			assert.Equal(t, off1.ID, ids[1])
			assert.Equal(t, off2.ID, ids[2])
		})

		t.Run("only math and extraclass offers", func(t *testing.T) {
			ids, err := offerDAL.SearchInES("aula calculo", c1.ID, c4.ID)

			// We expect get documents that matches aula or calculo but only belonging to the Math or Extraclass categories
			assert.Equal(t, nil, err)
			assert.Equal(t, 4, len(ids))
			assert.Equal(t, off3.ID, ids[0])
			assert.Equal(t, off1.ID, ids[1])
			assert.Equal(t, off2.ID, ids[2])
			assert.Equal(t, off8.ID, ids[3])
		})
	})
}
