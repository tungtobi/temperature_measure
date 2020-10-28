package Models

import "time"

type Temperature struct {
	ID        uint    `gorm:"primaryKey"`
	Env       float64 `json:"env"`
	Obj       float64 `json:"obj"`
	CreatedAt time.Time
}

func (b *Temperature) TableName() string {
	return "temperature"
}
