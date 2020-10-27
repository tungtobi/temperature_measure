package Routes

import (
	"rest-test/Controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//SetupRouter ... Configure routes
func SetupRouter() *gin.Engine {
	r := gin.Default()
	grp := r.Group("/BTL")
	{
		grp.GET("", Controllers.GetTemperature)
		// grp2.POST("", Controllers.CreateTemperature)
	}
	r.Use(cors.Default())
	return r
}
